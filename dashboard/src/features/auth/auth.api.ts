import { axiosInstance } from '@/src/lib/axios';

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/api/users/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
export const verifyOtp = async (email: string, otpCode: string) => {
  try {
    const response = await axiosInstance.post('/api/users/verify-otp', {
      email,
      otp_code: otpCode,
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};
export const forgotPassword = async (email: string) => {
  try {
    const response = await axiosInstance.post('/api/users/forgot-password', {
      email,
    });
    return response.data;
  } catch (error) {
    console.error('Error in forgot password:', error);
    throw error;
  }
};
export const resetPassword = async (email: string, otpCode: string, newPassword: string) => {
  try {
    const response = await axiosInstance.post('/api/users/reset-password', {
      email,
      otp_code: otpCode,
      new_password: newPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Error in reset password:', error);
    throw error;
  }
};
