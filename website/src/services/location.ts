import { locationEndpoint } from "@/constants/endpoint";
import {
  GetLocationsResponse,
  CreateLocationRequest,
  CreateLocationResponse,
  UpdateLocationRequest,
  UpdateLocationResponse,
  DeleteLocationResponse,
} from "@/definitions/locations";
import { axiosInstance } from "@/lib/axios-instance";

// ─── GET /api/locations ───────────────────────────────────────────────────────
// Public – no auth required
// Note: Spring Security permits "/api/locations" (no trailing slash).
// Using locationEndpoint.slice(0, -1) to strip the trailing "/" from the constant.
export const getLocations = async (): Promise<GetLocationsResponse> => {
  try {
    const response = await axiosInstance.get<GetLocationsResponse>(
      locationEndpoint.slice(0, -1), // "/api/locations/" → "/api/locations"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};
