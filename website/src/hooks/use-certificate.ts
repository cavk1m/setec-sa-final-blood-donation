"use client";

import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { axiosInstance } from "@/lib";
import { Certificate, GetCertificatesResponse } from "@/definitions/certificate";

export const useGetMyCertificates = (token: string): UseQueryResult<GetCertificatesResponse, Error> => {
  return useQuery({
    queryKey: ["certificates", token],
    queryFn: async () => {
      const response = await axiosInstance.get<GetCertificatesResponse>("/api/certificates", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    enabled: !!token,
  });
};

export const useGetCertificateById = (id: string, token: string): UseQueryResult<Certificate, Error> => {
  return useQuery({
    queryKey: ["certificate", id, token],
    queryFn: async () => {
      const response = await axiosInstance.get<Certificate>(`/api/certificates/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    enabled: !!id && !!token,
  });
};
