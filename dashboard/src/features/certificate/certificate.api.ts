import { axiosInstance } from '@/src/lib/axios';

export interface CertificateData {
  id: string;
  certificate_number: string;
  issued_date: string;
  location_name: string;
  pdf_url: string;
  user: {
    full_name: string;
    blood_type: string;
  };
}

export const getDashboardCertificates = async (): Promise<CertificateData[]> => {
  try {
    const response = await axiosInstance.get('/api/certificates');
    return response.data.certificates;
  } catch (error) {
    console.error('Error fetching dashboard certificates:', error);
    throw error;
  }
};

export const getCertificatePrint = async (id: string): Promise<string> => {
  try {
    const response = await axiosInstance.get(`/api/certificates/${id}/print`);
    return response.data;
  } catch (error) {
    console.error('Error fetching certificate print HTML:', error);
    throw error;
  }
};
