import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";

import {
  DonationRegisterRequest,
  DonationRegisterResponse,
  GetMyQueueResponse,
} from "@/definitions/donation";
import { axiosInstance } from "@/lib";
import { donationEndpoint } from "@/constants/endpoint";
import {
  mockDonationRegisterResponse,
  mockGetMyQueueResponse,
} from "@/services/mock-data";

// export const useDonationRegister = (): UseMutationResult<
//   DonationRegisterResponse,
//   Error,
//   DonationRegisterRequest
// > => {
//   return useMutation({
//     mutationFn: async (data: DonationRegisterRequest) => {
//       const response = await axiosInstance.post<DonationRegisterResponse>(
//         `${donationEndpoint}register`,
//         data,
//       );
//       return response.data;
//     },
//   });
// };

// Mock implementation for donation registration (simulates API delay with timeout)

export const useDonationRegister = (): UseMutationResult<
  DonationRegisterResponse,
  Error,
  DonationRegisterRequest
> => {
  return useMutation({
    mutationFn: async (data: DonationRegisterRequest) => {
      // Return mock data (simulates API delay)
      return new Promise<DonationRegisterResponse>((resolve) => {
        setTimeout(() => resolve(mockDonationRegisterResponse), 800);
      });
    },
  });
};

// export const useGetMyQueue = (): UseQueryResult<GetMyQueueResponse, Error> => {
//   return useQuery({
//     queryKey: ["my-queue"],
//     queryFn: async () => {
//       const response = await axiosInstance.get<GetMyQueueResponse>(
//         `${donationEndpoint}my-queue`,
//       );
//       return response.data;
//     },
//   });
// };

// Mock implementation for fetching user's queue status (simulates API delay with timeout)
export const useGetMyQueue = (): UseQueryResult<GetMyQueueResponse, Error> => {
  return useQuery({
    queryKey: ["my-queue"],
    queryFn: async () => {
      // Return mock data
      return new Promise<GetMyQueueResponse>((resolve) => {
        setTimeout(() => resolve(mockGetMyQueueResponse), 500);
      });
    },
  });
};
