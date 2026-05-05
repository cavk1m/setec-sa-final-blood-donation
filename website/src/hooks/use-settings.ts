"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "./zustand/use-auth-store";

export interface WebsiteSettings {
  hero_background_url: string;
  logo_url: string;
  updated_at: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8081";

export const useGetSettings = (): UseQueryResult<WebsiteSettings, Error> => {
  const token = useAuthStore.getState().user?.token;

  return useQuery({
    queryKey: ["website-settings"],
    queryFn: async () => {
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const response = await axios.get<WebsiteSettings>(`${BASE_URL}/api/settings`, config);
      return response.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
  });
};
