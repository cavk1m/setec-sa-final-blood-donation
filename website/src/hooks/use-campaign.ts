import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GetCampaignsResponse } from "@/definitions/campaign";
import { getCampaigns } from "@/services/campaign";

// GET /api/campaigns
export const useGetCampaigns = (): UseQueryResult<
  GetCampaignsResponse,
  Error
> => {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: getCampaigns,
  });
};
