"use client";

import {
  RegisterRequest,
  RegisterResponse,
  LoginData,
  LoginResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  UploadProfilePictureResponse,
  ProfileResponse,
} from "@/definitions/auth";
import {
  SendOtpData,
  SendOtpResponse,
  VerifyOtpData,
  VerifyOtpResponse,
} from "@/definitions/auth";
import { axiosInstance } from "@/lib";
import { authEndpoint } from "@/constants/endpoint";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useRegister = (): UseMutationResult<
  RegisterResponse,
  Error,
  RegisterRequest
> => {
  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const response = await axiosInstance.post<RegisterResponse>(
        `${authEndpoint}register`,
        data,
      );
      return response.data;
    },
  });
};

export const useSendOtp = (): UseMutationResult<
  SendOtpResponse,
  Error,
  SendOtpData
> => {
  return useMutation({
    mutationFn: async (data: SendOtpData) => {
      const response = await axiosInstance.post<SendOtpResponse>(
        "/api/auth/send-otp",
        data,
      );
      return response.data;
    },
  });
};

export const useVerifyOtp = (): UseMutationResult<
  VerifyOtpResponse,
  Error,
  VerifyOtpData
> => {
  return useMutation({
    mutationFn: async (data: VerifyOtpData) => {
      const response = await axiosInstance.post<VerifyOtpResponse>(
        `${authEndpoint}verify-otp`,
        data,
      );
      return response.data;
    },
  });
};

export const useLogin = (): UseMutationResult<
  LoginResponse,
  Error,
  LoginData
> => {
  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await axiosInstance.post<LoginResponse>(
        `${authEndpoint}login`,
        data,
      );
      return response.data;
    },
  });
};

export const useUpdateProfile = (): UseMutationResult<
  UpdateProfileResponse,
  Error,
  { data: UpdateProfileRequest; token: string }
> => {
  return useMutation({
    mutationFn: async ({ data, token }) => {
      const response = await axiosInstance.put<UpdateProfileResponse>(
        "/api/users/profile",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    },
  });
};

export const useGetProfile = (): UseMutationResult<
  ProfileResponse,
  Error,
  string
> => {
  return useMutation({
    mutationFn: async (token: string) => {
      const response = await axiosInstance.get<ProfileResponse>(
        "/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    },
  });
};

export const useUploadProfilePicture = (): UseMutationResult<
  UploadProfilePictureResponse,
  Error,
  { file: File; token: string }
> => {
  return useMutation({
    mutationFn: async ({ file, token }) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post<UploadProfilePictureResponse>(
        "/api/users/profile/picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    },
  });
};
