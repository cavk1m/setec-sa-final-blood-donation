// settings.ts – Website Settings API types
// Matches: SettingsController → /api/settings

// ─── Model ────────────────────────────────────────────────────────────────────

export interface WebsiteSettings {
  hero_background_url: string;
  logo_url: string;
  updated_at: string;
}

// ─── GET /api/settings ────────────────────────────────────────────────────────
// Public – no auth required

export type GetSettingsResponse = WebsiteSettings;

// ─── PUT /api/settings ────────────────────────────────────────────────────────
// Admin only – requires bearer JWT

export interface UpdateSettingsRequest {
  hero_background_url?: string;
  logo_url?: string;
}

export interface UpdateSettingsResponse {
  message: string;
  settings: WebsiteSettings;
}
