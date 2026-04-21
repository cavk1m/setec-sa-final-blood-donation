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

// export interface ProfileResponse {
//   userId: string;
//   email: string;
//   fullName: string;
//   role: "DONOR" | "ADMIN" | "ORGANIZATION";
//   dateOfBirth?: string;
//   phoneNumber?: string;
//   createdAt: string;
// }
export interface ProfileResponse {
  success: boolean;
  user: {
    id?: string;
    userId?: string;
    full_name: string;
    email: string;
    phone?: string;
    date_of_birth?: string;
    blood_type?: string;
    profile_picture_uri?: string;
    is_active?: boolean;
    last_login_date?: string | null;
    created_at?: string;
    updated_at?: string;
  };
}

export interface UpdateProfileRequest {
  full_name?: string;
  phone?: string;
  blood_type?:
    | "A_POSITIVE"
    | "A_NEGATIVE"
    | "B_POSITIVE"
    | "B_NEGATIVE"
    | "AB_POSITIVE"
    | "AB_NEGATIVE"
    | "O_POSITIVE"
    | "O_NEGATIVE";
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
    bloodType?: string;
  };
}

export interface UploadProfilePictureResponse {
  success: boolean;
  message: string;
  profilePictureUrl: string;
}

// Delete profile picture
export interface DeleteProfilePictureResponse {
  success: boolean;
  message: string;
}

// Change password
export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

// Forgot password
export interface ForgotPasswordData {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

// Reset password
export interface ResetPasswordData {
  email: string;
  otp_code: string;
  new_password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

// Deactivate account
export interface DeactivateAccountResponse {
  success: boolean;
  message: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  otp_code: string;
  new_password: string;
}
