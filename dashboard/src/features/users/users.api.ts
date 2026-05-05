import { axiosInstance } from "@/src/lib/axios";

export interface UserItem {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string;
  blood_type?: string;
  role: string;
  is_active: boolean;
  created_at: string;
  avatar_url?: string;
}

export interface FetchUsersResponse {
  success: boolean;
  users: UserItem[];
}

/** GET /api/users */
export const fetchUsers = async (): Promise<UserItem[]> => {
  const response = await axiosInstance.get<FetchUsersResponse>("/api/users");
  return response.data.users;
};

/** DELETE /api/users/{id} */
export const deleteUser = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/api/users/${id}`);
};

/** PUT /api/admin/users/{id} */
export const updateUser = async (id: string, data: any): Promise<any> => {
  const response = await axiosInstance.put(`/api/admin/users/${id}`, data);
  return response.data.user;
};

/** PUT /api/admin/users/create */
export const createUser = async (data: any): Promise<any> => {
  const response = await axiosInstance.post("/api/admin/users/create", data);
  return response.data.user;
};

/** PUT /api/admin/users/{id}/role */
export const updateUserRole = async (id: string, role: string): Promise<any> => {
  const response = await axiosInstance.put(`/api/admin/users/${id}/role`, { role });
  return response.data;
};
