// auth.ts - Authentication API types

export interface RegisterRequest {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  date_of_birth: string;
  password: string;
  blood_type:
    | "A_POSITIVE"
    | "A_NEGATIVE"
    | "B_POSITIVE"
    | "B_NEGATIVE"
    | "AB_POSITIVE"
    | "AB_NEGATIVE"
    | "O_POSITIVE"
    | "O_NEGATIVE";
}

export interface RegisterResponse {
  userId: string;
  email: string;
  message: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: string;
  email: string;
  token: string;
  role: "DONOR" | "ADMIN" | "ORGANIZATION";
}

export interface SendOtpData {
  email: string;
}

export interface SendOtpResponse {
  message: string;
  email: string;
}

export interface VerifyOtpData {
  email: string;
  otp_code: string;
}

export interface VerifyOtpResponse {
  message: string;
  verified: boolean;
}

export interface ProfileResponse {
  userId: string;
  email: string;
  fullName: string;
  role: "DONOR" | "ADMIN" | "ORGANIZATION";
  dateOfBirth?: string;
  phoneNumber?: string;
  createdAt: string;
}
