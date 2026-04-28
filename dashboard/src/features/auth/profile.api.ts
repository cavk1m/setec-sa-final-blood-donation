import { axiosInstance } from '@/src/lib/axios';

export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified: boolean;
  phone: string;
  phone_verified: boolean;
  avatar_url: string | null;
  date_of_birth: string | null;
  address: string | null;
  full_name: string | null;
  avatar_name: string | null;
  role: string;
  is_active: boolean;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfilePayload {
  full_name?: string;
  phone?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

/** GET /api/users/profile */
export const getProfile = async (): Promise<UserProfile> => {
  const response = await axiosInstance.get('/api/users/profile');
  return response.data.user;
};

/** PUT /api/users/profile */
export const updateProfile = async (payload: UpdateProfilePayload): Promise<UserProfile> => {
  const response = await axiosInstance.put('/api/users/profile', payload);
  return response.data.user;
};

/** POST /api/users/change-password */
export const changePassword = async (payload: ChangePasswordPayload): Promise<void> => {
  await axiosInstance.post('/api/users/change-password', {
    current_password: payload.currentPassword,
    new_password: payload.newPassword,
  });
};
