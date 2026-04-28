package com.setec.backend.Controller;

import com.setec.backend.Model.certificates;
import com.setec.backend.Service.CertificateService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/certificates")
@RequiredArgsConstructor
@Tag(name = "Certificates", description = "Certificate management")
public class CertificateController {

    private final CertificateService certificateService;

    @GetMapping
    @SecurityRequirement(name = "bearer-jwt")
    public ResponseEntity<?> getMyCertificates(HttpServletRequest request) {
        try {
            UUID userId = (UUID) request.getAttribute("currentUserId");
            List<certificates> certs = certificateService.getMyCertificates(userId);

            List<Map<String, Object>> certList = certs.stream().map(cert -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", cert.getId());
                map.put("certificate_number", cert.getCertificate_number());
                map.put("issued_date", cert.getIssued_date());
                map.put("location_name", cert.getLocation_name());
                map.put("pdf_url", cert.getPdf_url());
                return map;
            }).collect(Collectors.toList());

            return ResponseEntity.ok(Map.of("certificates", certList));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to fetch certificates: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/{id}")
    @SecurityRequirement(name = "bearer-jwt")
    public ResponseEntity<?> getCertificateById(
            @PathVariable String id,
            HttpServletRequest request) {
        try {
            UUID userId = (UUID) request.getAttribute("currentUserId");
            certificates cert = certificateService.getCertificateById(id, userId.toString());

            if (cert == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "success", false,
                    "message", "Certificate not found"
                ));
            }

            Map<String, Object> userMap = new HashMap<>();
            userMap.put("full_name", cert.getUser().getFullName());
            userMap.put("blood_type", cert.getUser().getBloodType());

            Map<String, Object> certMap = new HashMap<>();
            certMap.put("id", cert.getId());
            certMap.put("certificate_number", cert.getCertificate_number());
            certMap.put("issued_date", cert.getIssued_date());
            certMap.put("location_name", cert.getLocation_name());
            certMap.put("user", userMap);
            certMap.put("pdf_url", cert.getPdf_url());
            certMap.put("created_at", cert.getCreated_at());

            return ResponseEntity.ok(certMap);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to fetch certificate: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/{id}/print")
    @SecurityRequirement(name = "bearer-jwt")
    public ResponseEntity<?> printCertificate(
            @PathVariable String id,
            HttpServletRequest request) {
        try {
            UUID userId = (UUID) request.getAttribute("currentUserId");
           certificates cert = certificateService.getCertificateById(id, userId.toString());

            if (cert == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "success", false,
                    "message", "Certificate not found"
                ));
            }

            String html = certificateService.generatePrintHtml(cert);
            return ResponseEntity.ok()
                .contentType(MediaType.TEXT_HTML)
                .body(html);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to print certificate: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/{id}/download")
    @SecurityRequirement(name = "bearer-jwt")
    public ResponseEntity<?> downloadCertificate(
            @PathVariable String id,
            HttpServletRequest request) {
        try {
            UUID userId = (UUID) request.getAttribute("currentUserId");
           certificates cert = certificateService.getCertificateById(id, userId.toString());

            if (cert == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "success", false,
                    "message", "Certificate not found"
                ));
            }

            String html = certificateService.generatePrintHtml(cert);
            byte[] htmlBytes = html.getBytes();

            return ResponseEntity.ok()
                .contentType(MediaType.TEXT_HTML)
                .header("Content-Disposition",
                    "attachment; filename=\"" + cert.getCertificate_number() + ".html\"")
                .body(htmlBytes);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to download certificate: " + e.getMessage()
            ));
        }
    }
}