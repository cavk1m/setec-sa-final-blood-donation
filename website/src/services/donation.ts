import { donationEndpoint } from "@/constants/endpoint";
import {
  DonationRegisterRequest,
  DonationRegisterResponse,
  GetMyQueueResponse,
} from "@/definitions/donation";
import { axiosInstance } from "@/lib/axios-instance";

export const createDonationRegister = async (
  data: DonationRegisterRequest,
): Promise<DonationRegisterResponse> => {
  try {
    const response = await axiosInstance.post<DonationRegisterResponse>(
      `${donationEndpoint}register`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error registering donation:", error);
    throw error;
  }
};

export const getMyQueue = async (): Promise<GetMyQueueResponse> => {
  try {
    const response = await axiosInstance.get<GetMyQueueResponse>(
      `${donationEndpoint}my-queue`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching queue status:", error);
    throw error;
  }
};
