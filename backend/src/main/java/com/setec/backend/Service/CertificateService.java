// package com.setec.backend.Service;

// import com.setec.backend.Model.certificates;
// import com.setec.backend.Repository.CertificateRepository;
// import lombok.RequiredArgsConstructor;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.UUID;

// @Service
// @RequiredArgsConstructor
// public class CertificateService {

//     private static final Logger log = LoggerFactory.getLogger(CertificateService.class);

//     private final CertificateRepository certificateRepository;

//     public List<certificates> getMyCertificates(UUID userId) {
//     log.info("Fetching certificates for userId: {}", userId);
//     List<certificates> result = certificateRepository.findByUserId(userId);
//     log.info("Found {} certificates", result.size());
//     return result;
// }

// public certificates getCertificateById(String id, String userId) {
//     return certificateRepository.findByIdAndUserId(
//         UUID.fromString(id), 
//         UUID.fromString(userId)
//     ).orElse(null);
// }

//     public String generatePrintHtml(certificates cert) {
//         return """
//                 <!DOCTYPE html>
//                 <html lang="en">
//                 <head>
//                   <meta charset="UTF-8" />
//                   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//                   <title>Blood Donation Certificate</title>
//                   <link rel="preconnect" href="https://fonts.googleapis.com">
//                   <link href="https://fonts.googleapis.com/css2?family=Moul&family=Noto+Serif+Khmer:wght@400;700&family=Cormorant+Garamond:wght@400;700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
//                   <style>
//                     :root { --deep-red: #bb1f2d; --wine: #2b1012; --ink: #241f1f; }
//                     * { box-sizing: border-box; }
//                     html, body { margin: 0; background: #fff; font-family: 'Inter', sans-serif; }
//                     .page-shell { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
//                     .certificate {
//                       position: relative; width: min(96vw, 1200px);
//                       aspect-ratio: 1.414 / 1; background: #fff;
//                       border-radius: 6px; box-shadow: 0 28px 70px rgba(45,10,14,0.16); overflow: hidden;
//                     }
//                     .border-layer {
//                       position: absolute; inset: 0;
//                       border: 22px solid var(--deep-red); border-radius: 6px; pointer-events: none;
//                     }
//                     .certificate::before {
//                       content: ''; position: absolute; inset: 28px;
//                       border: 1px solid rgba(187,31,45,0.14); border-radius: 2px; pointer-events: none;
//                     }
//                     .certificate-header {
//                       display: grid; grid-template-columns: 1fr minmax(420px,560px) 1fr;
//                       align-items: start; padding: 88px 72px 0; position: relative; z-index: 2;
//                     }
//                     .title-block { text-align: center; padding-top: 6px; }
//                     .khmer-top {
//                       margin: 0; font-family: 'Moul','Noto Serif Khmer',serif;
//                       font-size: clamp(26px,2.5vw,38px); color: var(--ink);
//                     }
//                     .khmer-sub {
//                       margin: 4px 0 0; font-family: 'Moul','Noto Serif Khmer',serif;
//                       font-size: clamp(20px,1.8vw,28px); color: var(--ink);
//                     }
//                     .divider { margin: 14px auto 20px; width: 130px; height: 14px; position: relative; }
//                     .divider span {
//                       position: absolute; inset: 50%% 0 auto; height: 1.5px;
//                       background: linear-gradient(90deg,transparent,var(--ink),transparent);
//                     }
//                     .event-line {
//                       margin: 0; font-family: 'Moul','Noto Serif Khmer',serif;
//                       font-size: 20px; color: rgba(36,31,31,0.88);
//                     }
//                     .main-title {
//                       margin: 6px 0 4px; font-family: 'Moul','Noto Serif Khmer',serif;
//                       font-size: 20px; color: rgba(36,31,31,0.88);
//                     }
//                     .recipient-name {
//                       margin: 6px 0 0; font-family: 'Moul','Noto Serif Khmer',serif;
//                       font-size: 20px; color: var(--deep-red); font-weight: bold;
//                     }
//                     .certificate-body {
//                       padding: 26px 96px 0; text-align: center; position: relative; z-index: 2;
//                     }
//                     .intro {
//                       margin: 0; font-family: 'Noto Serif Khmer',serif;
//                       font-size: 20px; color: rgba(36,31,31,0.88);
//                     }
//                     .details-grid {
//                       display: flex; flex-direction: column;
//                       align-items: flex-end; gap: 4px;
//                       margin: 54px 0 0 auto; text-align: right;
//                     }
//                     .details-grid p {
//                       margin: 0; font-family: 'Noto Serif Khmer',serif;
//                       font-size: 18px; font-weight: 700; color: var(--ink); line-height: 1.55;
//                     }
//                     .cert-info {
//                       position: absolute; bottom: 40px; left: 96px;
//                       font-size: 13px; color: rgba(36,31,31,0.5); font-family: 'Inter', sans-serif;
//                     }
//                     @media print {
//                       body { background: #fff; }
//                       .page-shell { padding: 0; }
//                       .certificate { width: 100vw; height: 100vh; box-shadow: none; border-radius: 0; }
//                     }
//                   </style>
//                   <script>window.onload = function() { window.print(); }</script>
//                 </head>
//                 <body>
//                   <main class="page-shell">
//                     <section class="certificate">
//                       <div class="border-layer"></div>
//                       <header class="certificate-header">
//                         <div></div>
//                         <div class="title-block">
//                           <p class="khmer-top">ព្រះរាជាណាចក្រកម្ពុជា</p>
//                           <p class="khmer-sub">ជាតិ សាសនា ព្រះមហាក្សត្រ</p>
//                           <div class="divider"><span></span></div>
//                           <p class="event-line">លិខិតថ្លែងអំណរគុណ</p>
//                           <p class="main-title">សូមកោតសរសើរ និងថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅ</p>
//                           <p class="recipient-name">%s</p>
//                         </div>
//                         <div></div>
//                       </header>
//                       <section class="certificate-body">
//                         <p class="intro">
//                           ដែលបានចូលរួមចំណែក ប្រកបដោយសណ្តានចិត្តសប្បុរស ក្នុងការចំណាយពេលវេលា លះបង់កម្លាំងកាយចិត្តស្ម័គ្រចិត្តក្នុងការបរិច្ចាកឈាមដោយស្ម័គ្រចិត្តជូនដល់ <strong>%s</strong> ដើម្បីជាគុណប្រយោជន៍ក្នុងការជួយសង្រ្គោះជីវិតជនរងគ្រោះ។
//                         </p>
//                         <div class="details-grid">
//                           <p>រាជធានីភ្នំពេញ ថ្ងៃទី %s</p>
//                           <p>Blood Donation</p>
//                         </div>
//                       </section>
//                       <div class="cert-info">
//                         Certificate No: %s &nbsp;|&nbsp; Blood Type: %s
//                       </div>
//                     </section>
//                   </main>
//                 </body>
//                 </html>
//                 """.formatted(
//                     cert.getUser().getFullName(),
//                     cert.getLocation_name(),
//                     cert.getIssued_date().toLocalDate().toString(),
//                     cert.getCertificate_number(),
//                     cert.getUser().getBloodType()
//                 );
//     }
// }

package com.setec.backend.Service;

import com.setec.backend.Model.certificates;
import com.setec.backend.Repository.CertificateRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CertificateService {

    private static final Logger log = LoggerFactory.getLogger(CertificateService.class);

    private final CertificateRepository certificateRepository;

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

                    body {
                      font-family: 'Inter', sans-serif;
                      background: #f5f5f5;
                      color: #241f1f;
                    }

                    .page-shell {
                      min-height: 100vh;
                      display: grid;
                      place-items: center;
                      padding: 24px;
                    }

                    .certificate {
                      position: relative;
                      width: min(96vw, 1100px);
                      aspect-ratio: 1.414 / 1;
                      background: #ffffff;
                      border-radius: 6px;
                      box-shadow: 0 28px 70px rgba(45,10,14,0.18);
                      overflow: hidden;
                    }

                    /* Outer red border */
                    .cert-border {
                      position: absolute;
                      inset: 0;
                      border: 22px solid #bb1f2d;
                      border-radius: 6px;
                      pointer-events: none;
                      z-index: 3;
                    }

                    /* Inner decorative rings */
                    .cert-border::before {
                      content: '';
                      position: absolute;
                      inset: 6px;
                      border: 1px solid rgba(187,31,45,0.25);
                      border-radius: 2px;
                    }
                    .cert-border::after {
                      content: '';
                      position: absolute;
                      inset: 14px;
                      border: 1px solid rgba(36,31,31,0.07);
                      border-radius: 2px;
                    }

                    /* Watermark */
                    .cert-watermark {
                      position: absolute;
                      inset: 0;
                      background-image: url('/img/Logo_Blood-DonationV2.png');
                      background-repeat: no-repeat;
                      background-position: center;
                      background-size: 60%% auto;
                      opacity: 0.07;
                      z-index: 0;
                    }

                    /* Flower decorations */
                    .flower { position: absolute; z-index: 1; }
                    .flower img { display: block; width: 100%%; height: auto; }
                    .flower-top-left  { top: -60px;  left: -2px;   width: 220px; }
                    .flower-bot-left  { bottom: -6px; left: -40px; width: 130px; }
                    .flower-bot-left2 { bottom: 16px; left: 90px;  width: 170px; }
                    .flower-bot-left3 { top: 560px;   left: 20px;  width: 90px;  }

                    /* Brand logo top-right */
                    .brand {
                      position: absolute;
                      top: 40px;
                      right: 48px;
                      width: 210px;
                      z-index: 2;
                    }
                    .brand img { width: 100%%; height: auto; display: block; }

                    /* Header */
                    .cert-header {
                      position: relative;
                      z-index: 2;
                      display: grid;
                      grid-template-columns: 120px 1fr 120px;
                      align-items: start;
                      padding: 80px 70px 0;
                    }

                    .title-block { text-align: center; }

                    .kh-kingdom {
                      font-family: 'Moul', 'Noto Serif Khmer', serif;
                      font-size: clamp(24px, 2.4vw, 36px);
                      line-height: 1.7;
                      color: #241f1f;
                    }
                    .kh-motto {
                      font-family: 'Moul', 'Noto Serif Khmer', serif;
                      font-size: clamp(18px, 1.7vw, 26px);
                      line-height: 1.3;
                      margin-top: 4px;
                      color: #241f1f;
                    }

                    .divider {
                      width: 130px;
                      margin: 14px auto 18px;
                      height: 1.5px;
                      background: linear-gradient(90deg, transparent, #241f1f, transparent);
                    }

                    .kh-letter-type {
                      font-family: 'Moul', 'Noto Serif Khmer', serif;
                      font-size: 19px;
                      color: rgba(36,31,31,0.88);
                    }
                    .kh-praise {
                      font-family: 'Moul', 'Noto Serif Khmer', serif;
                      font-size: 18px;
                      margin-top: 6px;
                      color: rgba(36,31,31,0.88);
                    }
                    .recipient-name {
                      font-family: 'Moul', 'Noto Serif Khmer', serif;
                      font-size: 20px;
                      font-weight: bold;
                      margin-top: 6px;
                      color: #bb1f2d;
                    }

                    /* Body */
                    .cert-body {
                      position: relative;
                      z-index: 2;
                      padding: 22px 90px 0;
                      text-align: center;
                    }

                    .intro {
                      font-family: 'Noto Serif Khmer', serif;
                      font-size: 19px;
                      font-weight: 700;
                      line-height: 1.8;
                      color: rgba(36,31,31,0.88);
                    }

                    /* Date / signature */
                    .sign-block {
                      display: flex;
                      flex-direction: column;
                      align-items: flex-end;
                      gap: 4px;
                      margin-top: 48px;
                      text-align: right;
                    }
                    .sign-block p {
                      font-family: 'Noto Serif Khmer', serif;
                      font-size: 17px;
                      font-weight: 700;
                      color: #241f1f;
                      line-height: 1.55;
                    }
                    .sign-name {
                      font-family: 'Inter', sans-serif !important;
                      font-size: 17px !important;
                      font-weight: 500 !important;
                      margin-top: 10px;
                    }

                    /* Meta bottom-left */
                    .cert-meta {
                      position: absolute;
                      bottom: 36px;
                      left: 90px;
                      font-size: 12px;
                      color: rgba(36,31,31,0.48);
                      font-family: 'Inter', sans-serif;
                      z-index: 2;
                    }

                    @media print {
                      body { background: #fff; }
                      .page-shell { padding: 0; }
                      .certificate {
                        width: 100vw;
                        height: 100vh;
                        box-shadow: none;
                        border-radius: 0;
                        aspect-ratio: auto;
                      }
                      .cert-border { border-radius: 0; }
                    }
                  </style>
                  <script>window.onload = function () { window.print(); }</script>
                </head>
                <body>
                  <main class="page-shell">
                    <section class="certificate">

                      <div class="cert-border"></div>
                      <div class="cert-watermark"></div>

                      <div class="flower flower-top-left"><img src="/img/Flower.png" alt="" /></div>
                      <div class="flower flower-bot-left"><img src="/img/Flower.png" alt="" /></div>
                      <div class="flower flower-bot-left2"><img src="/img/Flower.png" alt="" /></div>
                      <div class="flower flower-bot-left3"><img src="/img/Flower.png" alt="" /></div>

                      <div class="brand">
                        <img src="/img/Logo_Blood-DonationV2.png" alt="Blood Donation logo" />
                      </div>

                      <header class="cert-header">
                        <div></div>
                        <div class="title-block">
                          <p class="kh-kingdom">ព្រះរាជាណាចក្រកម្ពុជា</p>
                          <p class="kh-motto">ជាតិ សាសនា ព្រះមហាក្សត្រ</p>
                          <div class="divider"></div>
                          <p class="kh-letter-type">លិខិតថ្លែងអំណរគុណ</p>
                          <p class="kh-praise">សូមកោតសរសើរ និងថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅ</p>
                          <p class="recipient-name">%s</p>
                        </div>
                        <div></div>
                      </header>

                      <section class="cert-body">
                        <p class="intro">
                          ដែលបានចូលរួមចំណែក ប្រកបដោយសណ្តានចិត្តសប្បុរស ក្នុងការចំណាយពេលវេលា
                          លះបង់កម្លាំងកាយចិត្តស្ម័គ្រចិត្តក្នុងការបរិច្ចាកឈាមដោយស្ម័គ្រចិត្តជូនដល់
                          <strong>%s</strong>
                          ដើម្បីជាគុណប្រយោជន៍ក្នុងការជួយសង្រ្គោះជីវិតជនរងគ្រោះ។
                        </p>

                        <div class="sign-block">
                          <p>រាជធានីភ្នំពេញ ថ្ងៃទី %s</p>
                          <p class="sign-name">Blood Donation</p>
                        </div>
                      </section>

                      <div class="cert-meta">
                        Certificate No: %s &nbsp;|&nbsp; Blood Type: %s
                      </div>

                    </section>
                  </main>
                </body>
                </html>
                """.formatted(
                    cert.getUser().getFullName(),
                    cert.getLocation_name(),
                    cert.getIssued_date().toLocalDate().toString(),
                    cert.getCertificate_number(),
                    cert.getUser().getBloodType()
                );
    }
}