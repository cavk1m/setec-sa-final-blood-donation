import { authEndpoint } from "@/constants/endpoint";
import { RegisterRequest, RegisterResponse } from "@/definitions/register";
import { axiosInstance } from "@/lib";

export const getRegister = async (
  data: RegisterRequest,
): Promise<RegisterResponse> => {
  try {
    const response = await axiosInstance.post(`${authEndpoint}register`, data);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
