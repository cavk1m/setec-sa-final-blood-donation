# Blood Donation API - Comprehensive Error Documentation

## Table of Contents
1. [Error Response Format](#error-response-format)
2. [HTTP Status Codes](#http-status-codes)
3. [Authentication Errors](#authentication-errors)
4. [User Errors](#user-errors)
5. [OTP Errors](#otp-errors)
6. [Validation Errors](#validation-errors)
7. [File Upload Errors](#file-upload-errors)
8. [Authorization Errors](#authorization-errors)
9. [System Errors](#system-errors)

---

## Error Response Format

All API error responses follow a standard format:

### Standard Error Response
```json
{
  "status": "ERROR",
  "message": "Description of the error",
  "timestamp": "2026-03-21T14:15:30.123456",
  "path": "/api/users/register",
  "method": "POST",
  "details": null,
  "data": null
}
```

### Validation Error Response
```json
{
  "status": "VALIDATION_ERROR",
  "message": "Validation failed",
  "timestamp": "2026-03-21T14:15:30.123456",
  "path": "/api/users/register",
  "method": "POST",
  "details": {
    "email": "Email should be valid",
    "password": "Password must be at least 8 characters",
    "date_of_birth": "Date of birth cannot be in the future"
  }
}
```

---

## HTTP Status Codes

| Status Code | Meaning | When Used |
|-------------|---------|-----------|
| 200 OK | Success | Request processed successfully |
| 400 Bad Request | Client error | Invalid input or validation failure |
| 401 Unauthorized | Authentication failed | Missing or invalid JWT token |
| 403 Forbidden | Access denied | User lacks required permissions/roles |
| 404 Not Found | Resource not found | User, hospital, or resource doesn't exist |
| 409 Conflict | Resource already exists | Email already registered, duplicate entry |
| 413 Payload Too Large | File too large | Uploaded file exceeds size limit |
| 415 Unsupported Media Type | Invalid file type | File extension not allowed |
| 500 Internal Server Error | Server error | Unexpected server error |

---

## Authentication Errors

### 1. Invalid Email Format
**Endpoint:** `POST /api/users/register`  
**HTTP Status:** 400 Bad Request  
**Error Code:** `VALIDATION_ERROR`

```json
{
  "status": "VALIDATION_ERROR",
  "message": "Validation failed",
  "details": {
    "email": "Please provide a valid email address"
  }
}
```

**Causes:**
- Email missing @domain
- Invalid characters in email
- Empty email field

**Fix:** Provide valid email format (example@domain.com)

---

### 2. Invalid Password Format
**Endpoint:** `POST /api/users/register`  
**HTTP Status:** 400 Bad Request  
**Error Code:** `VALIDATION_ERROR`

```json
{
  "status": "VALIDATION_ERROR",
  "message": "Validation failed",
  "details": {
    "password": "Password must be at least 8 characters with uppercase, lowercase, and numbers"
  }
}
```

**Password Requirements:**
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character

**Fix:** Use stronger password

---

### 3. Password Mismatch
**Endpoint:** `POST /api/users/register`  
**HTTP Status:** 400 Bad Request  
**Error Code:** `VALIDATION_ERROR`

```json
{
  "status": "VALIDATION_ERROR",
  "message": "Validation failed",
  "details": {
    "confirm_password": "Passwords do not match"
  }
}
```

**Causes:**
- Password and confirm_password fields don't match

**Fix:** Ensure both password fields are identical

---

### 4. Missing Required Fields
**Endpoint:** `POST /api/users/register`  
**HTTP Status:** 400 Bad Request  
**Error Code:** `VALIDATION_ERROR`

```json
{
  "status": "VALIDATION_ERROR",
  "message": "Validation failed",
  "details": {
    "full_name": "Full name is required",
    "phone": "Phone number is required",
    "date_of_birth": "Date of birth is required",
    "blood_type": "Blood type is required"
  }
}
```

**Required Fields for Registration:**
- email
- password
- confirm_password
- full_name
- phone
- date_of_birth
- blood_type

**Fix:** Provide all required fields in request body

---

### 5. Invalid Date of Birth
**Endpoint:** `POST /api/users/register`  
**HTTP Status:** 400 Bad Request  
**Error Code:** `VALIDATION_ERROR`

```json
{
  "status": "VALIDATION_ERROR",
  "message": "Validation failed",
  "details": {
    "date_of_birth": "Date of birth must be in the past"
  }
}
```

**Causes:**
- Date of birth is in the future
- Date format is invalid

**Format:** `YYYY-MM-DD` (Example: 1990-01-15)

**Fix:** Provide valid past date in correct format

---

### 6. Email Already Registered
**Endpoint:** `POST /api/users/register`  
**HTTP Status:** 409 Conflict  
**Error Code:** `USER_ALREADY_EXISTS`

```json
{
  "status": "USER_ALREADY_EXISTS",
  "message": "User with email already@registered.com already exists",
  "timestamp": "2026-03-21T14:15:30.123456"
}
```

**Causes:**
- Email already registered in system
- User was previously deleted but email not released

**Fix:** Use different email or contact support for account recovery

---

### 7. Invalid Credentials
**Endpoint:** `POST /api/users/login`  
**HTTP Status:** 401 Unauthorized  
**Error Code:** `INVALID_CREDENTIALS`

```json
{
  "status": "INVALID_CREDENTIALS",
  "message": "Invalid email or password",
  "timestamp": "2026-03-21T14:15:30.123456"
}
```

**Causes:**
- Email doesn't exist in system
- Password is incorrect
- Account is inactive

**Fix:** Verify email and password are correct

---

### 8. User Not Found
**Endpoint:** `GET /api/users/profile`  
**HTTP Status:** 404 Not Found  
**Error Code:** `USER_NOT_FOUND`

```json
{
  "status": "USER_NOT_FOUND",
  "message": "User not found: user@example.com",
  "timestamp": "2026-03-21T14:15:30.123456"
}
```

**Causes:**
- User ID in JWT token doesn't exist
- User was deleted
- Invalid user reference

**Fix:** Log in again to get valid token

---

## OTP Errors

### 1. OTP Invalid
**Endpoint:** `POST /api/users/verify-otp`  
**HTTP Status:** 400 Bad Request  
**Error Code:** `OTP_INVALID`

```json
{
  "status": "OTP_INVALID",
  "message": "Invalid OTP code",
  "timestamp": "2026-03-21T14:15:30.123456"
}
```

**Causes:**
- Wrong OTP code entered
- OTP doesn't exist for email
- OTP already verified

**Fix:** Re-enter correct OTP or request new OTP

---

### 2. OTP Expired
**Endpoint:** `POST /api/users/verify-otp`  
**HTTP Status:** 401 Unauthorized  
**Error Code:** `OTP_EXPIRED`

```json
{
  "status": "OTP_EXPIRED",
  "message": "OTP has expired. Please request a new OTP",
  "timestamp": "2026-03-21T14:15:30.123456"
}
```

**OTP Validity:** 10 minutes from generation

**Causes:**
- More than 10 minutes passed since OTP generation
- OTP was manually deleted

**Fix:** Use `/api/users/resend-otp` to get new OTP

---

### 3. OTP Already Verified
**Endpoint:** `POST /api/users/verify-otp`  
**HTTP Status:** 409 Conflict  
**Error Code:** `OTP_ALREADY_VERIFIED`

```json
{
  "status": "OTP_ALREADY_VERIFIED",
  "message": "OTP for this email has already been verified",
  "timestamp": "2026-03-21T14:15:30.123456"
}
```

**Causes:**
- OTP was already verified in previous request
- Attempting to verify same OTP twice

**Fix:** Proceed with login or request new OTP for different operation

---

### 4. Rate Limit Exceeded (OTP)
**Endpoint:** `POST /api/users/generate-otp`  
**HTTP Status:** 429 Too Many Requests  
**Error Code:** `RATE_LIMITED`

```json
{
  "status": "RATE_LIMITED",
  "message": "Too many OTP requests. Please wait before requesting again",
  "timestamp": "2026-03-21T14:15:30.123456"
}
```

**Rate Limit:** Maximum 5 OTP requests per hour per email

**Causes:**
- User requested more than 5 OTPs in the last hour
- Automated OTP request attempts

**Fix:** Wait 1 hour and try again

---

## JWT/Token Errors

### 1. Token Invalid
**Endpoint:** Any authenticated endpoint  
**HTTP Status:** 401 Unauthorized  
**Error Code:** `JWT_INVALID`

```json
{
  "status": "JWT_INVALID",
  "message": "Invalid JWT token",
  "timestamp": "2026-03-21T14:15:30.123456"
}
```

**Causes:**
- Token signature is invalid
- Token was tampered with
- Token uses wrong secret key

**Fix:** Obtain new token via login

---

### 2. Token Expired
**Endpoint:** Any authenticated endpoint  
**HTTP Status:** 401 Unauthorized  
**Error Code:** `JWT_EXPIRED`

```json
{
  "status": "JWT_EXPIRED",
  "message": "JWT token has expired",
  "timestamp": "2026-03-21T14:15:30.123456"
}
```

**Token Validity:** 24 hours from generation

**Causes:**
- Token was issued more than 24 hours ago
- Device clock is incorrect

**Fix:** Use refresh token or login again

---

### 3. Token Missing
**Endpoint:** Any authenticated endpoint  
**HTTP Status:** 401 Unauthorized  
**Error Code:** `UNAUTHORIZED`

```json
{
  "status": "UNAUTHORIZED",
  "message": "You must provide an Authorization header with JWT token",
  "timestamp": "2026-03-21T14:15:30.123456"
}
```

**Causes:**
- Authorization header missing
- Token not provided in request

**Solution:**
Add header: `Authorization: Bearer <your_jwt_token>`

---

## Validation Errors

### 1. Invalid Phone Number
**Endpoint:** `POST /api/users/register`  
**HTTP Status:** 400 Bad Request  
**Error Code:** `VALIDATION_ERROR`

```json
{
  "status": "VALIDATION_ERROR",
  "message": "Validation failed",
  "details": {
    "phone": "Phone number must be between 7 and 15 digits"
  }
}
```

**Format:** Numbers only, 7-15 digits

**Fix:** Provide valid phone number

---

### 2. Invalid Blood Type
**Endpoint:** `POST /api/users/register`  
**HTTP Status:** 400 Bad Request  
**Error Code:** `VALIDATION_ERROR`

```json
{
  "status": "VALIDATION_ERROR",
  "message": "Validation failed",
  "details": {
    "blood_type": "Invalid blood type. Must be one of: O_POSITIVE, O_NEGATIVE, A_POSITIVE, A_NEGATIVE, B_POSITIVE, B_NEGATIVE, AB_POSITIVE, AB_NEGATIVE"
  }
}
```

**Valid Blood Types:**
- O_POSITIVE
- O_NEGATIVE
- A_POSITIVE
- A_NEGATIVE
- B_POSITIVE
- B_NEGATIVE
- AB_POSITIVE
- AB_NEGATIVE

**Fix:** Provide valid blood type

---

### 3. Invalid Request Body (JSON Parse Error)
**Endpoint:** Any endpoint with request body  
**HTTP Status:** 400 Bad Request  
**Error Code:** `VALIDATION_ERROR`

```json
{
  "status": "VALIDATION_ERROR",
  "message": "Invalid JSON format in request body",
  "details": "JSON parse error at line 2"
}
```

**Causes:**
- Malformed JSON
- Missing closing brackets
- Invalid characters

**Fix:** Validate JSON format before sending

---

## File Upload Errors

### 1. File Too Large
**Endpoint:** `POST /api/users/upload-profile-picture`  
**HTTP Status:** 413 Payload Too Large  
**Error Code:** `FILE_TOO_LARGE`

```json
{
  "status": "FILE_TOO_LARGE",
  "message": "File size exceeds maximum allowed size of 5MB",
  "timestamp": "2026-03-21T14:15:30.123456"
}
```

**Size Limit:** 5 MB

**Causes:**
- Uploaded file exceeds 5 MB
- Multiple files uploaded together

**Fix:** Compress or reduce file size

---

### 2. Invalid File Type
**Endpoint:** `POST /api/users/upload-profile-picture`  
**HTTP Status:** 415 Unsupported Media Type  
**Error Code:** `FILE_TYPE_NOT_SUPPORTED`

```json
{
  "status": "FILE_TYPE_NOT_SUPPORTED",
  "message": "File type not allowed. Allowed types: jpg, jpeg, png, gif",
  "timestamp": "2026-03-21T14:15:30.123456"
}
```

**Allowed File Types:**
- jpg
- jpeg
- png
- gif

**Causes:**
- Wrong file extension
- Incorrect MIME type

**Fix:** Convert file to allowed format

---

### 3. Empty File Upload
**Endpoint:** `POST /api/users/upload-profile-picture`  
**HTTP Status:** 400 Bad Request  
**Error Code:** `VALIDATION_ERROR`

```json
{
  "status": "VALIDATION_ERROR",
  "message": "File is empty",
  "details": "Cannot upload empty file"
}
```

**Causes:**
- File size is 0 bytes
- File handle is null

**Fix:** Select valid file before upload

---

## Authorization Errors

### 1. Missing Permission
**Endpoint:** `POST /api/admin/users`  
**HTTP Status:** 403 Forbidden  
**Error Code:** `PERMISSION_DENIED`

```json
{
  "status": "PERMISSION_DENIED",
  "message": "User does not have permission: USER_CREATE",
  "timestamp": "2026-03-21T14:15:30.123456"
}
```

**Causes:**
- User's role doesn't include required permission
- User role is HOSPITAL or USER (limited permissions)

**Required Permissions by Endpoint:**
- USER_CREATE: Create new user
- USER_READ: View user details
- USER_UPDATE: Modify user
- USER_DELETE: Delete user
- ADMIN_CREATE: Create admin
- HOSPITAL_READ: View hospital
- DONATION_CREATE: Create donation
- And 25 more...

**Fix:** Request administrator to grant required permission

---

### 2. Missing Role
**Endpoint:** `POST /api/admin/*`  
**HTTP Status:** 403 Forbidden  
**Error Code:** `ROLE_DENIED`

```json
{
  "status": "ROLE_DENIED",
  "message": "User does not have required role: ADMIN",
  "timestamp": "2026-03-21T14:15:30.123456"
}
```

**Available Roles:**
- SUPER_ADMIN: All permissions
- ADMIN: 25 permissions (no system config)
- HOSPITAL: 8 read-only permissions
- USER: 4 personal permissions

**Causes:**
- User role is USER or HOSPITAL
- User account type doesn't match requirement

**Fix:** Contact system administrator

---

### 3. Access Denied (Spring Security)
**Endpoint:** Any endpoint  
**HTTP Status:** 403 Forbidden  
**Error Code:** `ACCESS_DENIED`

```json
{
  "status": "ACCESS_DENIED",
  "message": "You do not have permission to access this resource",
  "timestamp": "2026-03-21T14:15:30.123456"
}
```

**Causes:**
- Security configuration denies access
- CORS policy violation
- Endpoint requires specific role

**Fix:** Verify user role and check endpoint requirements

---

## System Errors

### 1. Email Send Failed
**Endpoint:** `POST /api/users/register` (OTP email)  
**HTTP Status:** 500 Internal Server Error  
**Error Code:** `EMAIL_SEND_FAILED`

```json
{
  "status": "EMAIL_SEND_FAILED",
  "message": "Failed to send OTP email to user@example.com",
  "timestamp": "2026-03-21T14:15:30.123456"
}
```

**Causes:**
- SMTP server unreachable
- Email configuration incorrect
- Network connectivity issue

**Fix:** Retry request or contact support

---

### 2. Database Error
**Endpoint:** Any endpoint  
**HTTP Status:** 500 Internal Server Error  
**Error Code:** `INTERNAL_SERVER_ERROR`

```json
{
  "status": "INTERNAL_SERVER_ERROR",
  "message": "An error occurred: Connection to database failed",
  "timestamp": "2026-03-21T14:15:30.123456"
}
```

**Causes:**
- Database connection lost
- Transaction timeout
- Data integrity violation

**Fix:** Try again later or contact support

---

### 3. Unexpected Server Error
**Endpoint:** Any endpoint  
**HTTP Status:** 500 Internal Server Error  
**Error Code:** `INTERNAL_SERVER_ERROR`

```json
{
  "status": "INTERNAL_SERVER_ERROR",
  "message": "An unexpected error occurred",
  "details": "NullPointerException",
  "timestamp": "2026-03-21T14:15:30.123456"
}
```

**Causes:**
- Unhandled exception in code
- Missing configuration
- Resource allocation failure

**Fix:** Check server logs and contact support

---

## Error Handling Best Practices

### For API Clients:

1. **Always Check HTTP Status Code**
   ```
   200-299: Success
   400-499: Client error (fix request)
   500-599: Server error (retry later)
   ```

2. **Parse Error Response**
   - Check `status` field for error type
   - Read `message` for description
   - Check `details` for field-specific errors

3. **Implement Retry Logic**
   - Retry on 5xx errors with exponential backoff
   - Don't retry on 4xx errors (usually need fix)

4. **Log Errors Properly**
   - Include timestamp, endpoint, status code
   - Store error messages for debugging
   - Monitor repeated errors

5. **User-Friendly Messages**
   - Don't show technical error messages to users
   - Map API errors to user-friendly text
   - Suggest corrective actions

### Common Error Scenarios:

**Username/Email Already Exists:**
- Error: 409 Conflict, USER_ALREADY_EXISTS
- Solution: Use different email or password reset

**OTP Invalid/Expired:**
- Error: 400 Bad Request, OTP_INVALID
- Solution: Request new OTP using resend-otp endpoint

**Invalid Status:**
- All status fields use UPPERCASE_SNAKE_CASE
- Never assume status format in client code

**File Upload Fails:**
- Check file size (< 5MB)
- Check file type (jpg, jpeg, png, gif only)
- Check file is not empty

---

## Testing Error Scenarios

### Using cURL:

```bash
# Test invalid email
curl -X POST http://localhost:8081/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"invalid"}'

# Test OTP invalid
curl -X POST http://localhost:8081/api/users/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","otp":"000000"}'

# Test missing authorization
curl -X GET http://localhost:8081/api/users/profile

# Test file too large
curl -X POST http://localhost:8081/api/users/upload-profile-picture \
  -F "file=@large_file.jpg"
```

---

## Error Response Fields

| Field | Type | Description |
|-------|------|-------------|
| status | String | Error type (ERROR, VALIDATION_ERROR, USER_NOT_FOUND, etc.) |
| message | String | Human-readable error message |
| timestamp | String | When error occurred (ISO-8601 format) |
| path | String | API endpoint path |
| method | String | HTTP method (GET, POST, etc.) |
| details | Object/String | Additional error details (field-specific for validation) |
| data | Object | Extra data relevant to error |

---

## Support & Contact

For unresolved errors:
1. Check this documentation
2. Review API logs
3. Contact: support@blooddonation.com
4. GitHub Issues: https://github.com/yourusername/blood-donation

---

**Last Updated:** March 21, 2026  
**API Version:** 1.0.0  
**Status:** Production Ready
