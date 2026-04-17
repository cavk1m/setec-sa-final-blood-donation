# CLAUDE.md — Blood Donation & Charity Platform

This file gives Claude (and other AI agents) full context about this project's architecture, conventions, and patterns so it can assist effectively without guessing.

---

## Project Overview

A full-stack **Blood Donation & Charity Platform** built with:

- **Frontend:** Next.js (TypeScript) with React Query, Axios
- **Backend:** Java 17+ · Spring Boot 3 · Spring Security · JPA (Hibernate) · PostgreSQL
- **Storage:** Supabase Storage (images, QR codes, PDFs, certificates)
- **Payments:** ABA PayWay (KHQR checkout + webhook)
- **Auth:** JWT Bearer tokens (jjwt library)

---

## Frontend Architecture

### File Conventions

| File                | Purpose                | Example                                      |
| ------------------- | ---------------------- | -------------------------------------------- |
| `query-key.ts`      | React Query cache keys | `export const QUERY_KEY = 'value'`           |
| `endpoint.ts`       | API endpoint constants | `export const ENDPOINT: string = '/api/...'` |
| `index.ts`          | Re-export barrel file  | `export * from './...'`                      |
| `axios-instance.ts` | Shared Axios instance  | See below                                    |
| `*.api.ts`          | API call functions     | `getName()`, `getUserInfo()`                 |

### Axios Instance

```typescript
export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    "api-keys": process.env.NEXT_PUBLIC_API_KEY || "",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
});
```

> ⚠️ For user-specific auth, the `Authorization` header is overridden per-request using the token from `getUserInfo()`.

### API Function Pattern

```typescript
export const getName = async ({
  params,
  headers,
}: {
  params: ParamsType;
  headers: Record<string, string | undefined>;
}): Promise<ILocation[]> => {
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${ENDPOINT}`,
      { headers, ...params },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching name:", error);
    throw error;
  }
};
```

### Auth Pattern

```typescript
// Always fetch the user token before protected API calls
const user = await getUserInfo();
// Then pass user.token in headers to the API function
```

### Environment Variables (Frontend)

```
NEXT_PUBLIC_BASE_URL=      # Backend base URL
NEXT_PUBLIC_API_KEY=       # Static API key header
NEXT_PUBLIC_API_TOKEN=     # Static bearer token (for public/anonymous calls)
```

---

## Backend Architecture

### Stack

- Java 17+, Spring Boot 3
- Spring Security + JWT (`jjwt`)
- JPA / Hibernate + PostgreSQL
- Lombok (`@Data`, `@Builder`, `@RequiredArgsConstructor`)
- JavaMailSender (email/OTP)
- iText7 (PDF generation)
- RestTemplate / WebClient (external API calls)

### Package Structure Convention

```
src/main/java/com/yourapp/
├── controller/       # @RestController classes
├── service/          # @Service business logic
├── repository/       # JpaRepository interfaces
├── entity/           # @Entity JPA models
├── dto/              # Request/Response DTOs (never expose entities directly)
├── security/
│   ├── JwtUtil.java
│   ├── JwtAuthFilter.java        # OncePerRequestFilter
│   ├── CustomUserDetailsService.java
│   └── UserPrincipal.java
├── config/
│   └── SecurityConfig.java       # permitAll vs authenticated rules
├── exception/
│   ├── ResourceNotFoundException.java
│   └── GlobalExceptionHandler.java  # @ControllerAdvice
└── util/             # Helpers (HMAC, certificate number generation, etc.)
```

### Security Rules

| Endpoint                          | Auth Required | Role                  |
| --------------------------------- | ------------- | --------------------- |
| `POST /api/auth/*`                | ❌ Public     | —                     |
| `GET /api/survey/questions`       | ❌ Public     | —                     |
| `GET /api/locations`              | ❌ Public     | —                     |
| `GET /api/campaigns`              | ❌ Public     | —                     |
| `GET /api/settings`               | ❌ Public     | —                     |
| `POST /api/donate/webhook`        | ❌ Public     | PayWay only           |
| `GET /api/auth/profile`           | ✅ JWT        | donor/admin/org       |
| `POST /api/donation/register`     | ✅ JWT        | donor                 |
| `GET /api/certificates/**`        | ✅ JWT        | donor (own only)      |
| `GET /api/dashboard/queue`        | ✅ JWT        | ADMIN                 |
| `PUT /api/dashboard/queue/{id}/*` | ✅ JWT        | ADMIN                 |
| `POST /api/locations`             | ✅ JWT        | ADMIN or ORGANIZATION |
| `PUT /api/locations/{id}`         | ✅ JWT        | ADMIN or ORGANIZATION |
| `DELETE /api/locations/{id}`      | ✅ JWT        | ADMIN                 |
| `POST,PUT,DELETE /api/campaigns`  | ✅ JWT        | ADMIN                 |
| `PUT /api/settings`               | ✅ JWT        | ADMIN                 |

### JWT Token

- Header: `Authorization: Bearer <token>`
- Token contains: `user_id`, `email`, `role`, expiry
- Extracted via `JwtAuthFilter` → stored in `SecurityContextHolder`
- Access in controller: `@AuthenticationPrincipal UserPrincipal principal`

### Standard Error Response Format

```json
{
  "error": "Descriptive error message",
  "code": 404
}
```

HTTP codes: `400` Bad Request · `401` Unauthorized · `403` Forbidden · `404` Not Found · `500` Server Error

---

## API Endpoints Reference

Base URL: `/api`

### Auth

| Method | Endpoint           | Auth | Description              |
| ------ | ------------------ | ---- | ------------------------ |
| POST   | `/auth/send-otp`   | ❌   | Send OTP to email        |
| POST   | `/auth/verify-otp` | ❌   | Verify OTP code          |
| POST   | `/auth/register`   | ❌   | Register user (post-OTP) |
| POST   | `/auth/login`      | ❌   | Login → returns JWT      |
| GET    | `/auth/profile`    | ✅   | Get current user profile |

### Survey & Donation

| Method | Endpoint             | Auth | Description                      |
| ------ | -------------------- | ---- | -------------------------------- |
| GET    | `/survey/questions`  | ❌   | List all survey questions        |
| POST   | `/donation/register` | ✅   | Submit answers, get queue number |
| GET    | `/donation/my-queue` | ✅   | Get current user's queue status  |

### Admin Queue

| Method | Endpoint                         | Auth     | Description                                   |
| ------ | -------------------------------- | -------- | --------------------------------------------- |
| GET    | `/dashboard/queue`               | ✅ ADMIN | List waiting donors at admin's location       |
| PUT    | `/dashboard/queue/{id}/complete` | ✅ ADMIN | Mark donor complete → auto-create certificate |
| PUT    | `/dashboard/queue/{id}/skip`     | ✅ ADMIN | Skip donor in queue                           |

### Certificates

| Method | Endpoint                      | Auth | Description                       |
| ------ | ----------------------------- | ---- | --------------------------------- |
| GET    | `/certificates`               | ✅   | All certificates for current user |
| GET    | `/certificates/{id}`          | ✅   | Single certificate detail         |
| GET    | `/certificates/{id}/download` | ✅   | Stream PDF file                   |
| GET    | `/certificates/{id}/print`    | ✅   | Return printable HTML page        |

### Locations

| Method | Endpoint          | Auth         | Description                           |
| ------ | ----------------- | ------------ | ------------------------------------- |
| GET    | `/locations`      | ❌           | List all donation locations           |
| POST   | `/locations`      | ✅ ADMIN/ORG | Create location (multipart/form-data) |
| PUT    | `/locations/{id}` | ✅ ADMIN/ORG | Update location                       |
| DELETE | `/locations/{id}` | ✅ ADMIN     | Delete location                       |

### Campaigns

| Method | Endpoint          | Auth     | Description        |
| ------ | ----------------- | -------- | ------------------ |
| GET    | `/campaigns`      | ❌       | List all campaigns |
| POST   | `/campaigns`      | ✅ ADMIN | Create campaign    |
| PUT    | `/campaigns/{id}` | ✅ ADMIN | Update campaign    |
| DELETE | `/campaigns/{id}` | ✅ ADMIN | Delete campaign    |

### Money Donations (ABA PayWay)

| Method | Endpoint          | Auth      | Description                              |
| ------ | ----------------- | --------- | ---------------------------------------- |
| POST   | `/donate/money`   | ✅        | Initiate donation → returns checkout_url |
| POST   | `/donate/webhook` | ❌ PUBLIC | PayWay payment confirmation webhook      |
| GET    | `/donate/history` | ✅        | Current user's donation history          |

### Settings

| Method | Endpoint    | Auth     | Description                 |
| ------ | ----------- | -------- | --------------------------- |
| GET    | `/settings` | ❌       | Get hero image & logo URLs  |
| PUT    | `/settings` | ✅ ADMIN | Upload new hero/logo images |

---

## Key Patterns & Rules

### Never Do This

- ❌ Never store plain-text passwords — always use `BCryptPasswordEncoder`
- ❌ Never return `@Entity` objects directly from controllers — use DTOs
- ❌ Never use `double` or `float` for money — always `BigDecimal`
- ❌ Never trust the frontend to send `user_id` — always read from `@AuthenticationPrincipal`
- ❌ Never make the PayWay webhook require authentication

### Always Do This

- ✅ Use `@Transactional` when writing to multiple tables in one operation
- ✅ Filter certificate/queue queries by BOTH `id` AND `user_id` to prevent data leaks
- ✅ Check idempotency on the PayWay webhook (PayWay may call it multiple times)
- ✅ Use `@ControllerAdvice` for global error handling
- ✅ Set `created_by` from JWT — never from the request body
- ✅ Use `@PreAuthorize` to enforce role restrictions on admin endpoints

### File Uploads (Supabase Storage)

- Use `RestTemplate` or `WebClient` to call Supabase Storage REST API
- Uploading to the same path automatically replaces the old file (upsert behavior)
- Store the returned public URL in the database (not the binary)

### ABA PayWay Integration

- Use **HMAC-SHA512** to sign requests and verify incoming webhooks
- Save a `pending` record BEFORE calling PayWay (in case the call fails)
- On webhook: verify signature → update `money_donations.status` → update `campaigns.current_amount` — all in one `@Transactional`

### Certificate Number Format

```java
"CERT-" + year + "-" + String.format("%05d", count)
// e.g. CERT-2026-00021
```

---

## Database Key Tables

| Table              | Description                                     |
| ------------------ | ----------------------------------------------- |
| `users`            | Donors, admins, organizations                   |
| `otp_codes`        | OTP verification codes with expiry              |
| `survey_questions` | Health screening questions                      |
| `donation_queue`   | Queue entries per location                      |
| `blood_donations`  | Completed donation records                      |
| `certificates`     | Issued certificates (linked to blood_donations) |
| `locations`        | Blood donation center locations                 |
| `campaigns`        | Charity campaigns                               |
| `money_donations`  | Payment records (pending/success/failed)        |
| `settings`         | Single-row site settings (hero image, logo)     |

---

## Development Tips for AI Agents

- When generating a new endpoint, follow the pattern: `Controller → Service → Repository → Entity/DTO`
- For any endpoint requiring file upload, use `@PostMapping(consumes = MULTIPART_FORM_DATA_VALUE)` with `@RequestPart`
- When writing a new frontend API call, follow the axios pattern above and export from the module's `index.ts`
- When modifying the queue or donation flow, always check for `@Transactional` — these touch multiple tables
- The simplest endpoint to use as a reference/template is `GET /api/survey/questions` (no auth, no file upload, simple findAll)
