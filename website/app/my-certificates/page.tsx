"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/hooks/zustand/use-auth-store";
import { useGetMyCertificates } from "@/hooks/use-certificate";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { axiosInstance } from "@/lib";

declare global {
  interface Window {
    html2pdf: any;
  }
}

export default function MyCertificatesPage() {
  const user = useAuthStore((s) => s.user);
  const { data, isLoading, isError } = useGetMyCertificates(user?.token || "");
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  // Load html2pdf script from CDN
  useEffect(() => {
    if (typeof window !== "undefined" && !window.html2pdf) {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const certificates = data?.certificates || [];

  const handlePrint = async (certId: string) => {
    if (!user?.token) return;
    setIsProcessing(certId);
    try {
      const response = await axiosInstance.get(`/api/certificates/${certId}/print`, {
        headers: { Authorization: `Bearer ${user.token}` },
        responseType: 'text'
      });
      
      // Fix relative image paths before printing
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8081';
      const fixedHtml = response.data.replace(/src="\/img\//g, `src="${baseUrl}/img/`);

      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(fixedHtml);
        printWindow.document.close();
      }
    } catch (error) {
      console.error("Failed to print certificate:", error);
    } finally {
      setIsProcessing(null);
    }
  };

  const handleDownloadPDF = async (certId: string, certNumber: string) => {
    if (!user?.token) return;
    if (!window.html2pdf) {
      alert("PDF engine is loading. Please wait 2 seconds and try again.");
      return;
    }
    
    setIsProcessing(certId);
    try {
      // 1. Get the HTML from backend
      const response = await axiosInstance.get(`/api/certificates/${certId}/print`, {
        headers: { Authorization: `Bearer ${user.token}` },
        responseType: 'text'
      });
      
      // 2. Fix image paths (backend uses /img/ but we are on localhost:3000)
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8081';
      const fixedHtml = response.data.replace(/src="\/img\//g, `src="${baseUrl}/img/`);

      // 3. Use an iframe to render the full document safely
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      const iframeDoc = iframe.contentWindow?.document;
      if (!iframeDoc) throw new Error("Could not create iframe document");

      iframeDoc.open();
      iframeDoc.write(fixedHtml);
      iframeDoc.close();

      // Wait for images to load inside the iframe
      await new Promise(resolve => setTimeout(resolve, 1500));

      const element = iframeDoc.querySelector('.certificate');
      if (!element) throw new Error("Certificate element not found");

      // 4. PDF Options
      const opt = {
        margin: 0,
        filename: `${certNumber}.pdf`,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          logging: false,
          letterRendering: true
        },
        jsPDF: { unit: 'px', format: [1120, 790], orientation: 'landscape' }
      };

      // 5. Generate
      await window.html2pdf().set(opt).from(element).save();
      
      // 6. Cleanup
      document.body.removeChild(iframe);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("PDF generation failed. Please use the 'View & Print' button and select 'Save as PDF' instead.");
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfafc] pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#670017]/5 text-[#670017] text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            Achievement Gallery
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1c1b1f] mb-4">
            Your Life-Saving <span className="italic font-normal">Legacy</span>.
          </h1>
          <p className="text-[#8c7070] font-sans max-w-xl mx-auto leading-relaxed">
            Every certificate here represents a life touched and a community strengthened. Thank you for your extraordinary generosity.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 rounded-[32px] bg-white border border-[#f1ecf2] animate-pulse" />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && certificates.length === 0 && (
          <div className="bg-white rounded-[40px] p-16 text-center shadow-sm border border-[#f1ecf2]">
            <div className="w-20 h-20 bg-[#fcfafc] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg viewBox="0 0 24 24" fill="none" stroke="#e0bfbf" strokeWidth="1.5" className="w-10 h-10">
                <path d="M5 3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5z" />
                <path d="M7 7h6M7 11h6M7 15h4" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1c1b1f] mb-2">No Certificates Yet</h3>
            <p className="text-[#8c7070] font-sans mb-8">Complete your first donation to earn your official certificate of appreciation.</p>
            <Link href="/campaigns">
              <Button className="rounded-full bg-[#670017] px-10 font-bold h-12">Browse Campaigns</Button>
            </Link>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="group relative bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#670017]/10 transition-all duration-500 border border-[#f1ecf2]"
            >
              {/* Decorative Top */}
              <div 
                className="h-24 p-6 flex justify-between items-start"
                style={{ background: 'linear-gradient(to bottom right, #670017, #8c1127)' }}
              >
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                    <path d="M20 7L9 18l-5-5" />
                  </svg>
                </div>
                <span className="text-[10px] font-black text-white/60 tracking-widest uppercase">Official Achievement</span>
              </div>

              {/* Content */}
              <div className="p-8 pt-6">
                <div className="mb-6">
                   <p className="text-[10px] font-black text-[#670017] uppercase tracking-[0.2em] mb-1">ID Number</p>
                   <p className="text-xl font-mono font-bold text-[#1c1b1f] tracking-tight">{cert.certificate_number}</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#fcfafc] flex items-center justify-center text-[#670017]">
                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                         <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                         <circle cx="12" cy="10" r="3" />
                       </svg>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-[#8c7070] uppercase tracking-wider">Center</p>
                      <p className="text-sm font-bold text-[#1c1b1f]">{cert.location_name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#fcfafc] flex items-center justify-center text-[#670017]">
                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                         <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                         <line x1="16" y1="2" x2="16" y2="6" />
                         <line x1="8" y1="2" x2="8" y2="6" />
                         <line x1="3" y1="10" x2="21" y2="10" />
                       </svg>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-[#8c7070] uppercase tracking-wider">Issued On</p>
                      <p className="text-sm font-bold text-[#1c1b1f]">{new Date(cert.issued_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                   <Button
                     onClick={() => handlePrint(cert.id)}
                     disabled={isProcessing === cert.id}
                     className="flex-1 rounded-full bg-[#670017] hover:bg-[#4d0011] font-bold text-xs h-11"
                   >
                     {isProcessing === cert.id ? "..." : "View & Print"}
                   </Button>
                   <Button
                     variant="outline"
                     disabled={isProcessing === cert.id}
                     onClick={() => handleDownloadPDF(cert.id, cert.certificate_number)}
                     className="flex-1 rounded-full border-[#670017] text-[#670017] font-bold text-xs h-11 hover:bg-[#670017]/5 flex items-center justify-center gap-2"
                   >
                     {isProcessing === cert.id ? "Wait..." : (
                       <>
                         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                         </svg>
                         Download PDF
                       </>
                     )}
                   </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
