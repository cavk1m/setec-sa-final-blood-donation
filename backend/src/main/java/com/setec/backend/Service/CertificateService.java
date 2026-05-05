package com.setec.backend.Service;

import com.setec.backend.Model.certificates;
import com.setec.backend.Repository.CertificateRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CertificateService {

    private static final Logger log = LoggerFactory.getLogger(CertificateService.class);

    private final CertificateRepository certificateRepository;

    public CertificateService(CertificateRepository certificateRepository) {
        this.certificateRepository = certificateRepository;
    }

    public List<certificates> getMyCertificates(UUID userId) {
        log.info("Fetching certificates for userId: {}", userId);
        List<certificates> result = certificateRepository.findByUserId(userId);
        log.info("Found {} certificates", result.size());
        return result;
    }

    public certificates getCertificateById(String id, String userId) {
        return certificateRepository.findByIdAndUserId(
            UUID.fromString(id),
            UUID.fromString(userId)
        ).orElse(null);
    }

    public certificates getCertificateByUuid(UUID uuid) {
        return certificateRepository.findByIdWithUser(uuid).orElse(null);
    }

    public certificates getCertificateByNumber(String certNum) {
        return certificateRepository.findByCertificateNumber(certNum).orElse(null);
    }

    public certificates getLatestCertificateByUserId(UUID userId) {
        List<certificates> certs = certificateRepository.findLatestByUserId(userId);
        return certs.isEmpty() ? null : certs.get(0);
    }

    public String generatePrintHtml(certificates cert) {
        return """
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <title>Blood Donation Certificate</title>
                  <link rel="preconnect" href="https://fonts.googleapis.com">
                  <link href="https://fonts.googleapis.com/css2?family=Moul&family=Noto+Serif+Khmer:wght@400;700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
                  <style>
                    * { box-sizing: border-box; margin: 0; padding: 0; }
                    body { font-family: 'Inter', sans-serif; background: #f5f5f5; color: #241f1f; }
                    .page-shell { min-height: 100vh; display: grid; place-items: center; padding: 40px; }
                    .certificate {
                      position: relative;
                      width: 1100px;
                      height: 778px;
                      background: white;
                      box-shadow: 0 40px 100px rgba(0,0,0,0.15);
                      border: 20px solid #bb1f2d;
                      overflow: hidden;
                    }
                    .cert-border { position: absolute; inset: 0; border: 15px solid #bb1f2d; z-index: 3; pointer-events: none; }
                    .cert-watermark {
                      position: absolute; inset: 0;
                      background: url('/img/Logo_Blood-DonationV2.png') no-repeat center / 60%%;
                      opacity: 0.05; z-index: 0;
                    }
                    .flower { position: absolute; z-index: 1; }
                    .flower img { width: 100%%; }
                    .flower-tl { top: -40px; left: -20px; width: 200px; }
                    .flower-br { bottom: -20px; right: -20px; width: 150px; transform: rotate(180deg); }
                    
                    .cert-content { position: relative; z-index: 2; padding: 60px; height: 100%%; display: flex; flex-direction: column; align-items: center; text-align: center; }
                    .logo { width: 180px; margin-bottom: 20px; }
                    .khmer-title { font-family: 'Moul', cursive; font-size: 28px; color: #bb1f2d; margin-bottom: 5px; }
                    .khmer-subtitle { font-family: 'Noto Serif Khmer', serif; font-size: 18px; margin-bottom: 40px; font-weight: bold; }
                    .main-text { font-family: 'Noto Serif Khmer', serif; font-size: 20px; line-height: 1.8; color: #2d3748; }
                    .donor-name { font-family: 'Moul', cursive; font-size: 36px; color: #bb1f2d; margin: 20px 0; }
                    
                    .footer { width: 100%%; display: flex; justify-content: space-between; align-items: flex-end; margin-top: auto; }
                    .meta-info { text-align: left; font-size: 13px; color: #718096; font-family: 'Inter', sans-serif; line-height: 1.6; }
                    .sig-box { text-align: center; }
                    .sig-line { width: 200px; border-top: 2px solid #2d3748; margin-bottom: 5px; }
                    
                    @media print {
                      body { background: white; }
                      .page-shell { padding: 0; }
                      .certificate { box-shadow: none; border-width: 15px; width: 100vw; height: 100vh; }
                    }
                  </style>
                  <script>window.onload = function() { window.print(); }</script>
                </head>
                <body>
                  <div class="page-shell">
                    <div class="certificate">
                      <div class="cert-watermark"></div>
                      <div class="flower flower-tl"><img src="/img/Flower.png" /></div>
                      <div class="cert-content">
                        <img src="/img/Logo_Blood-DonationV2.png" class="logo" />
                        <h1 class="khmer-title">ព្រះរាជាណាចក្រកម្ពុជា</h1>
                        <h2 class="khmer-subtitle">ជាតិ សាសនា ព្រះមហាក្សត្រ</h2>
                        <div class="main-text">លិខិតថ្លែងអំណរគុណ<br/>សូមកោតសរសើរ និងថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះ</div>
                        <div class="donor-name">%s</div>
                        <div class="main-text">
                            ដែលបានចូលរួមចំណែក ប្រកបដោយសប្បុរសធម៌ ក្នុងការបរិច្ចាគឈាមដោយស្ម័គ្រចិត្ត<br/>
                            ជូនដល់ Phnom Penh Blood Center ដើម្បីបុព្វហេតុមនុស្សធម៌ ក្នុងការជួយសង្គ្រោះជីវិតជនរងគ្រោះ។
                        </div>
                        <div class="footer">
                          <div class="meta-info">
                            Certificate No: %s<br/>
                            Blood Type: %s<br/>
                            Date: %s
                          </div>
                          <div class="sig-box">
                            <div style="height: 60px"></div>
                            <div class="sig-line"></div>
                            <div style="font-weight: bold">Phnom Penh Blood Center</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </body>
                </html>
                """.formatted(
                    cert.getUser().getFullName(),
                    cert.getCertificate_number(),
                    cert.getUser().getBloodType(),
                    cert.getIssued_date().toString().split("T")[0]
                );
    }
}