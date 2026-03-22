# Postman Collection for Blood Donation API

This directory contains complete Postman collection files for testing the Blood Donation Management System API.

## Files Included

### 1. **POSTMAN_COLLECTION.json**
   - Complete API collection with all 34 endpoints
   - Organized into 5 categories:
     - System (Health check)
     - User Management (12 endpoints)
     - Hospital Management (6 endpoints)
     - Hospital Admin Management (3 endpoints)
     - Admin Operations (9 endpoints)
   - Includes pre-configured variables for easy testing
   - Sample request bodies for all endpoints

### 2. **POSTMAN_TEST_DATA.json**
   - Sample test data for all operations
   - Environment configurations (Development & Production)
   - Test user accounts
   - Hospital registration examples
   - Admin management examples
   - Error code reference
   - Response examples
   - Testing workflows and tips

## Quick Start Guide

### Step 1: Import Collections into Postman

1. Open Postman application
2. Click **Import** button (top-left)
3. Choose **Upload Files**
4. Select `POSTMAN_COLLECTION.json`
5. Click **Import**

Optional: Repeat for `POSTMAN_TEST_DATA.json` to get test data reference

### Step 2: Set Up Environment

1. In Postman, click **Environments** (top-right)
2. Create new environment or use existing
3. Add these variables:
   ```
   base_url = http://localhost:8081
   jwt_token = (leave blank, will populate after login)
   hospital_id = (leave blank, will populate after hospital registration)
   admin_id = (leave blank)
   role_id = (leave blank)
   permission_id = (leave blank)
   ```

### Step 3: Start Testing

#### **Basic User Registration Flow:**
1. **Register User** → POST `/api/users/register`
   - Fill in sample data from `POSTMAN_TEST_DATA.json`
   - Copy the OTP sent to email (or check logs)
   
2. **Verify OTP** → POST `/api/users/verify-otp`
   - Use OTP from step 1
   
3. **Login** → POST `/api/users/login`
   - Get JWT token from response
   - **Copy the token and paste into `jwt_token` variable in environment**
   
4. **Get Profile** → GET `/api/users/profile`
   - Now authenticated with JWT token

#### **Hospital Registration Flow:**
1. **Register Hospital** → POST `/api/hospitals/register`
   - Copy hospital ID from response
   - **Paste into `hospital_id` variable in environment**
   
2. **Verify Hospital** (as admin) → PUT `/api/admin/hospitals/{hospital_id}/verify`
   - Need ADMIN role JWT token

3. **Update Hospital** → PUT `/api/hospitals/{hospital_id}`
   - Update blood units and other info

## API Endpoints Summary

### User Management (12 endpoints)
- Register, verify OTP, resend OTP
- Login, get/update profile
- Upload/delete profile picture
- Change password, forgot/reset password
- Deactivate account

### Hospital Management (6 endpoints)
- Register hospital
- Get/update hospital details
- Update coordinator info
- Update blood units
- Check verification status

### Hospital Admin (3 endpoints)
- Add hospital admin
- Get hospital admins list
- Deactivate hospital admin

### Admin Operations (9 endpoints)
- Get all hospitals
- Get hospital by ID
- Verify hospital
- Get all roles
- Get role by ID
- Get all permissions
- Get role permissions
- Add/remove permission from role

## Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <jwt_token>
```

**Token validity:** 24 hours
**Get token:** Login with POST `/api/users/login`

## Important Notes

### Blood Types
```
A_POSITIVE, A_NEGATIVE
B_POSITIVE, B_NEGATIVE
AB_POSITIVE, AB_NEGATIVE
O_POSITIVE, O_NEGATIVE
```

### Password Requirements
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 digit
- At least 1 special character

### Rate Limits
- OTP requests: 5 per hour per email
- Other endpoints: Standard rate limiting

### File Upload
- Profile picture: Max 5MB
- Supported formats: JPEG, PNG, GIF, WebP

## Error Codes

| Code | Meaning |
|------|---------|
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Email/phone already registered |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Server Error |

## Example Workflows

### 1. Complete User Journey
```
1. Register → 2. Verify OTP → 3. Login → 4. Get Profile → 5. Update Profile
```

### 2. Hospital Admin Setup
```
1. Register Hospital → 2. Admin verifies hospital → 3. Add hospital admins
→ 4. Update blood units → 5. Manage coordinators
```

### 3. Permission Management (Admin Only)
```
1. Get all roles → 2. Get all permissions → 3. Add permission to role
→ 4. Verify in role permissions
```

## Useful Tips

1. **Save responses as examples:** Right-click request → Add example
2. **Use test scripts:** Go to Tests tab to validate responses
3. **Chain requests:** Use variables to pass data between requests
4. **Monitor performance:** View request/response time in Postman

## Troubleshooting

### "Missing JWT token" error
- Make sure you logged in and copied the token
- Check token hasn't expired (24 hours max)
- Verify Authorization header format: `Bearer <token>`

### "Email already registered" error
- Use different email address
- Or verify existing account first

### "Hospital not verified" error
- Admin must verify hospital first using `/api/admin/hospitals/{id}/verify`

### OTP not received
- Check email spam folder
- Use resend OTP endpoint (max 5 times per hour)

## API Documentation

For detailed API documentation, access Swagger UI:
```
http://localhost:8081/swagger-ui.html
```

## Support

For issues or questions:
1. Check `POSTMAN_TEST_DATA.json` for examples
2. Review error responses for error codes
3. Check server logs for detailed error messages
4. Ensure API server is running on port 8081

## Sample Test Data

All sample data is provided in `POSTMAN_TEST_DATA.json`:
- Test user accounts with different blood types
- Hospital registration examples
- Hospital admin examples
- Blood unit data
- Workflows and testing tips

---

**Last Updated:** 2026-03-22
**API Version:** 1.0.0
**Postman Collection Version:** 1.0.0
