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
import { createDonationRegister, getMyQueue } from "@/services/donation";
import { useAuthStore } from "./zustand/use-auth-store";

// POST /api/donation/register
export const useDonationRegister = (): UseMutationResult<
  DonationRegisterResponse,
  Error,
  DonationRegisterRequest
> => {
  const user = useAuthStore((s) => s.user);
  const token = user?.token;

  return useMutation({
    mutationFn: (data: DonationRegisterRequest) =>
      createDonationRegister(data, token),
  });
};

// GET /api/donation/my-queue
export const useGetMyQueue = (): UseQueryResult<GetMyQueueResponse, Error> => {
  const user = useAuthStore((s) => s.user);
  const token = user?.token;

  return useQuery({
    queryKey: ["my-queue", token],
    queryFn: () => getMyQueue(token),
  });
};
