import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GetLocationsResponse } from "@/definitions/locations";
import { getLocations } from "@/services/location";

// GET /api/locations
export const useGetLocations = (): UseQueryResult<
  GetLocationsResponse,
  Error
> => {
  return useQuery({
    queryKey: ["locations"],
    queryFn: getLocations,
  });
};
