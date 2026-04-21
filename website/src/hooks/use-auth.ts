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
  DeactivateAccountResponse,
  DeleteProfilePictureResponse,
  ChangePasswordResponse,
  ChangePasswordRequest,
  ForgotPasswordResponse,
  ForgotPasswordData,
  ResetPasswordResponse,
  ResetPasswordData,
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
        `${authEndpoint}send-otp`,
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
        `${authEndpoint}profile`,
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

// ─── Delete Profile Picture ───────────────────────────────────────────────

export const useDeleteProfilePicture = (): UseMutationResult<
  DeleteProfilePictureResponse,
  Error,
  string
> => {
  return useMutation({
    mutationFn: async (token: string) => {
      const response = await axiosInstance.delete<DeleteProfilePictureResponse>(
        `${authEndpoint}profile/picture`,
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

// ─── Change Password ──────────────────────────────────────────────────────

export const useChangePassword = (): UseMutationResult<
  ChangePasswordResponse,
  Error,
  { data: ChangePasswordRequest; token: string }
> => {
  return useMutation({
    mutationFn: async ({ data, token }) => {
      const response = await axiosInstance.post<ChangePasswordResponse>(
        `${authEndpoint}change-password`,
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

// ─── Forgot Password ──────────────────────────────────────────────────────

export const useForgotPassword = (): UseMutationResult<
  ForgotPasswordResponse,
  Error,
  ForgotPasswordData
> => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordData) => {
      const response = await axiosInstance.post<ForgotPasswordResponse>(
        `${authEndpoint}forgot-password`,
        data,
      );
      return response.data;
    },
  });
};

// ─── Reset Password ───────────────────────────────────────────────────────

export const useResetPassword = (): UseMutationResult<
  ResetPasswordResponse,
  Error,
  ResetPasswordData
> => {
  return useMutation({
    mutationFn: async (data: ResetPasswordData) => {
      const response = await axiosInstance.post<ResetPasswordResponse>(
        `${authEndpoint}reset-password`,
        data,
      );
      return response.data;
    },
  });
};

// ─── Deactivate Account ───────────────────────────────────────────────────

export const useDeactivateAccount = (): UseMutationResult<
  DeactivateAccountResponse,
  Error,
  string
> => {
  return useMutation({
    mutationFn: async (token: string) => {
      const response = await axiosInstance.delete<DeactivateAccountResponse>(
        "/api/account",
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

// ─── Resend OTP ───────────────────────────────────────────────────────────

export const useResendOtp = (): UseMutationResult<
  SendOtpResponse,
  Error,
  SendOtpData
> => {
  return useMutation({
    mutationFn: async (data: SendOtpData) => {
      const response = await axiosInstance.post<SendOtpResponse>(
        `${authEndpoint}resend-otp`,
        data,
      );
      return response.data;
    },
  });
};
