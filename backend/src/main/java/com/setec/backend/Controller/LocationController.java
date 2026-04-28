package com.setec.backend.Controller;

import com.setec.backend.Enum.DonationType;
import com.setec.backend.Model.locations;
import com.setec.backend.Repository.LocationRepository;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/locations")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Tag(name = "Locations", description = "Blood donation locations management")
public class LocationController {

    private final LocationRepository locationRepository;

    @GetMapping
    public ResponseEntity<?> getAllLocations() {
        try {
            List<locations> locationList = locationRepository.findAll();
            List<Map<String, Object>> result = locationList.stream()
                .map(l -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", l.getId().toString());
                    map.put("name", l.getName());
                    map.put("address", l.getAddress());
                    map.put("latitude", l.getLatitude());
                    map.put("longitude", l.getLongitude());
                    map.put("donation_type", l.getDonation_type() != null ? l.getDonation_type().toString() : null);
                    map.put("payment_qr_url", l.getPayment_qr_url());
                    return map;
                })
                .collect(Collectors.toList());
            return ResponseEntity.ok(Map.of("locations", result));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to get locations: " + e.getMessage()
            ));
        }
    }

    @PostMapping
    @SecurityRequirement(name = "bearer-jwt")
    public ResponseEntity<?> createLocation(@RequestBody Map<String, Object> request) {
        try {
            locations location = new locations();
            location.setName((String) request.get("name"));
            location.setAddress((String) request.get("address"));

            if (request.get("latitude") != null)
                location.setLatitude(new BigDecimal(request.get("latitude").toString()));
            if (request.get("longitude") != null)
                location.setLongitude(new BigDecimal(request.get("longitude").toString()));
            if (request.get("donation_type") != null)
                location.setDonation_type(DonationType.valueOf(request.get("donation_type").toString()));
            if (request.get("payment_qr_url") != null)
                location.setPayment_qr_url((String) request.get("payment_qr_url"));

            locations saved = locationRepository.save(location);

            Map<String, Object> result = new HashMap<>();
            result.put("id", saved.getId().toString());
            result.put("name", saved.getName());
            result.put("address", saved.getAddress());
            result.put("latitude", saved.getLatitude());
            result.put("longitude", saved.getLongitude());
            result.put("donation_type", saved.getDonation_type() != null ? saved.getDonation_type().toString() : null);
            result.put("payment_qr_url", saved.getPayment_qr_url());

            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Location created successfully",
                "location", result
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to create location: " + e.getMessage()
            ));
        }
    }

    @PutMapping("/{id}")
    @SecurityRequirement(name = "bearer-jwt")
    public ResponseEntity<?> updateLocation(@PathVariable String id, @RequestBody Map<String, Object> request) {
        try {
            locations location = locationRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new RuntimeException("Location not found"));

            if (request.get("name") != null) location.setName((String) request.get("name"));
            if (request.get("address") != null) location.setAddress((String) request.get("address"));
            if (request.get("latitude") != null) location.setLatitude(new BigDecimal(request.get("latitude").toString()));
            if (request.get("longitude") != null) location.setLongitude(new BigDecimal(request.get("longitude").toString()));
            if (request.get("donation_type") != null) location.setDonation_type(DonationType.valueOf(request.get("donation_type").toString()));
            if (request.get("payment_qr_url") != null) location.setPayment_qr_url((String) request.get("payment_qr_url"));

            locations saved = locationRepository.save(location);

            Map<String, Object> result = new HashMap<>();
            result.put("id", saved.getId().toString());
            result.put("name", saved.getName());
            result.put("address", saved.getAddress());
            result.put("payment_qr_url", saved.getPayment_qr_url());

            return ResponseEntity.ok(Map.of(
                "message", "Location updated successfully",
                "location", result
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to update location: " + e.getMessage()
            ));
        }
    }

    @DeleteMapping("/{id}")
    @SecurityRequirement(name = "bearer-jwt")
    public ResponseEntity<?> deleteLocation(@PathVariable String id) {
        try {
            locations location = locationRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new RuntimeException("Location not found"));
            locationRepository.delete(location);
            return ResponseEntity.ok(Map.of(
                "message", "Location deleted successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to delete location: " + e.getMessage()
            ));
        }
    }
}
