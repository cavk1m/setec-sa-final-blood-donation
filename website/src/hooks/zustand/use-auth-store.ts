// store/use-auth-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Matches LoginResponse from backend
export interface AuthUser {
  userId: string;
  email: string;
  token: string;
  role: "DONOR" | "ADMIN" | "ORGANIZATION";
}

export interface AuthProfile {
  userId?: string;
  email?: string;
  full_name?: string;
  phone?: string;
  profile_picture_url?: string;
  date_of_birth?: string;
  blood_type?: string;
  [key: string]: any; // Allow other profile fields from API
}

interface AuthState {
  user: AuthUser | null;
  profile: AuthProfile | null;

  // Actions
  setAuth: (user: AuthUser) => void;
  setUser: (user: AuthUser) => void;
  setProfile: (profile: AuthProfile) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      setAuth: (user) => set({ user }),
      setUser: (user) => set({ user }),
      setProfile: (profile) => set({ profile }),
      clearAuth: () => set({ user: null, profile: null }),
    }),
    {
      name: "hf_auth", // localStorage key
    },
  ),
);

/**
 * Use this before any protected API call:
 *
 *   const user = getUserInfo();
 *   // user.token  ← pass in headers
 */
export const getUserInfo = (): AuthUser | null => useAuthStore.getState().user;
