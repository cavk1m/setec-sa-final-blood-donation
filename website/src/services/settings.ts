import { settingsEndpoint } from "@/constants/endpoint";
import {
  GetSettingsResponse,
  UpdateSettingsRequest,
  UpdateSettingsResponse,
} from "@/definitions/settings";
import { axiosInstance } from "@/lib/axios-instance";

// Public – no auth required
export const getSettings = async (): Promise<GetSettingsResponse> => {
  try {
    const response =
      await axiosInstance.get<GetSettingsResponse>(settingsEndpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw error;
  }
};