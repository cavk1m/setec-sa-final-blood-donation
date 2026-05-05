import { certificateEndpoint } from "@/constants/endpoint";
import {
  GetMyCertificatesResponse,
  GetCertificateByIdResponse,
} from "@/definitions/certificate";
import { axiosInstance } from "@/lib/axios-instance";

// ─── GET /api/certificates ────────────────────────────────────────────────────
// Returns the authenticated user's own certificates – requires bearer JWT
export const getMyCertificates =
  async (): Promise<GetMyCertificatesResponse> => {
    try {
      const response =
        await axiosInstance.get<GetMyCertificatesResponse>(certificateEndpoint);
      return response.data;
    } catch (error) {
      console.error("Error fetching certificates:", error);
      throw error;
    }
  };

// ─── GET /api/certificates/{id} ───────────────────────────────────────────────
// Returns a single certificate with user details – requires bearer JWT
export const getCertificateById = async (
  id: string,
): Promise<GetCertificateByIdResponse> => {
  try {
    const response = await axiosInstance.get<GetCertificateByIdResponse>(
      `${certificateEndpoint}${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching certificate:", error);
    throw error;
  }
};

// ─── GET /api/certificates/{id}/print ─────────────────────────────────────────
// Opens the printable HTML certificate in a new tab
export const printCertificate = (id: string): void => {
  window.open(`${certificateEndpoint}${id}/print`, "_blank");
};

// ─── GET /api/certificates/{id}/download ──────────────────────────────────────
// Triggers a browser download of the certificate as an HTML file
export const downloadCertificate = (id: string): void => {
  window.open(`${certificateEndpoint}${id}/download`, "_blank");
};
