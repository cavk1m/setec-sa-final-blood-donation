import { donationEndpoint } from "@/constants/endpoint";
import {
  DonationRegisterRequest,
  DonationRegisterResponse,
  GetMyQueueResponse,
} from "@/definitions/donation";
import { axiosInstance } from "@/lib/axios-instance";

export const createDonationRegister = async (
  data: DonationRegisterRequest,
  token?: string,
): Promise<DonationRegisterResponse> => {
  try {
    const response = await axiosInstance.post<DonationRegisterResponse>(
      `${donationEndpoint.slice(0, -1)}/register`,
      data,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error registering donation:", error);
    throw error;
  }
};

export const getMyQueue = async (token?: string): Promise<GetMyQueueResponse> => {
  try {
    const response = await axiosInstance.get<GetMyQueueResponse>(
      `${donationEndpoint.slice(0, -1)}/my-queue`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching queue status:", error);
    throw error;
  }
};
