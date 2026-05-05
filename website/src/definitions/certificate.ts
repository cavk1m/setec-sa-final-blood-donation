export interface Certificate {
  id: string;
  certificate_number: string;
  issued_date: string;
  location_name: string;
  pdf_url?: string;
  created_at?: string;
  user?: {
    full_name: string;
    blood_type: string;
  };
}

export interface GetCertificatesResponse {
  certificates: Certificate[];
}
