import { campaignEndpoint } from "@/constants/endpoint";
import {
  GetCampaignsResponse,
  CreateCampaignRequest,
  CreateCampaignResponse,
  UpdateCampaignRequest,
  UpdateCampaignResponse,
  DeleteCampaignResponse,
} from "@/definitions/campaign";
import { axiosInstance } from "@/lib/axios-instance";

// ─── GET /api/campaigns ───────────────────────────────────────────────────────
// Public – no auth required
// Note: Spring Security permits "/api/campaigns" (no trailing slash).
export const getCampaigns = async (): Promise<GetCampaignsResponse> => {
  try {
    const response = await axiosInstance.get<GetCampaignsResponse>(
      campaignEndpoint.slice(0, -1), // "/api/campaigns/" → "/api/campaigns"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    throw error;
  }
};
