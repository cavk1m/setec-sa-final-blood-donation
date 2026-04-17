import { RegisterRequest, RegisterResponse } from "@/definitions/register";
import { axiosInstance } from "@/lib";

export const getRegister = async (
  data: RegisterRequest,
): Promise<RegisterResponse> => {
  try {
    const response = await axiosInstance.post("/api/auth/register", data);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
