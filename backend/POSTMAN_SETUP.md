# Blood Donation API - Postman Setup Guide

## 📋 Files Created

Three complete files have been created for Postman testing:

### 1. **POSTMAN_COLLECTION.json** (30 KB)
   - ✅ 34 API endpoints organized in 5 folders
   - ✅ All request methods (GET, POST, PUT, DELETE)
   - ✅ Sample request bodies for each endpoint
   - ✅ Pre-configured environment variables
   - ✅ Ready to import directly into Postman

### 2. **POSTMAN_TEST_DATA.json** (9.6 KB)
   - ✅ Sample test users with different blood types
   - ✅ Hospital registration examples
   - ✅ Admin management templates
   - ✅ Blood unit update samples
   - ✅ Error code reference
   - ✅ Response examples
   - ✅ Workflows and testing tips

### 3. **POSTMAN_README.md** (6.1 KB)
   - ✅ Quick start guide
   - ✅ Step-by-step import instructions
   - ✅ Testing workflows
   - ✅ API endpoints summary
   - ✅ Troubleshooting guide

## 🚀 Quick Setup (3 Steps)

### Step 1: Import Collection
1. Open Postman
2. Click **Import** button
3. Select **POSTMAN_COLLECTION.json**
4. Click **Import**

### Step 2: Set Environment Variables
1. Create/Select environment
2. Add these variables:
   ```
   base_url = http://localhost:8081
   jwt_token = (will update after login)
   hospital_id = (will update after registration)
   ```

### Step 3: Start Testing
1. Call **Health Check** → GET `/api/greeting`
2. Follow the numbered endpoints (1. Register User → 2. Verify OTP → etc.)

## 📊 API Endpoints Overview

### System
- ✅ Health Check (1)

### User Management  
- ✅ Register, Verify OTP, Resend OTP
- ✅ Login, Get/Update Profile
- ✅ Upload/Delete Picture
- ✅ Change/Reset Password
- ✅ Deactivate Account
- **Total: 12 endpoints**

### Hospital Management
- ✅ Register, Get, Update
- ✅ Update Coordinator
- ✅ Update Blood Units
- ✅ Check Verification Status
- **Total: 6 endpoints**

### Hospital Admin
- ✅ Add, Get List
- ✅ Deactivate
- **Total: 3 endpoints**

### Admin Operations
- ✅ Get Hospitals
- ✅ Verify Hospital
- ✅ Get Roles/Permissions
- ✅ Manage Role Permissions
- **Total: 9 endpoints**

## 🔐 Authentication

All protected endpoints require:
```
Authorization: Bearer <jwt_token>
```

**How to get JWT token:**
1. Call **Login** endpoint with email & password
2. Copy `token` from response
3. Paste in `{{jwt_token}}` variable
4. All subsequent requests will use this token

## 📝 Sample Test Scenarios

### Scenario 1: User Registration Flow
```
1. Register User → Get OTP
2. Verify OTP → Email verified
3. Login → Get JWT token
4. Get Profile → See user details
5. Update Profile → Modify details
```

### Scenario 2: Hospital Setup
```
1. Register Hospital → Get hospital ID
2. Admin verifies hospital
3. Add hospital admins
4. Update blood units
5. Update coordinator info
```

### Scenario 3: Admin Management
```
1. Get all hospitals
2. Verify hospital
3. Get all roles
4. View permissions
5. Manage role permissions
```

## ✅ Testing Checklist

- [ ] Import POSTMAN_COLLECTION.json
- [ ] Set base_url = http://localhost:8081
- [ ] Call Health Check endpoint (should return 200)
- [ ] Register new user
- [ ] Verify OTP (use 123456 or check logs)
- [ ] Login and get JWT token
- [ ] Get user profile (should show user details)
- [ ] Register hospital
- [ ] Get admin token (if available)
- [ ] Verify hospital
- [ ] Get all roles
- [ ] View permissions

## 🔧 Useful Postman Features

### Pre-request Script
Add to automatically set variables:
```javascript
// After successful login, save token
var token = pm.response.json().token;
pm.environment.set("jwt_token", token);
```

### Tests Tab
Add to validate responses:
```javascript
pm.test("Status is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response contains success field", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.success).to.equal(true);
});
```

## 📌 Important Notes

### Blood Types (8 total)
```
A_POSITIVE, A_NEGATIVE
B_POSITIVE, B_NEGATIVE  
AB_POSITIVE, AB_NEGATIVE
O_POSITIVE, O_NEGATIVE
```

### Password Requirements
- Min 8 characters
- At least 1 uppercase letter
- At least 1 digit
- At least 1 special character

Example: `Password@123`

### Rate Limits
- OTP requests: 5 per hour per email
- Tokens valid: 24 hours

### File Upload
- Max size: 5MB
- Format: JPEG, PNG, GIF, WebP

## 🆘 Troubleshooting

### "Base URL is not defined"
- Make sure `base_url` variable is set to `http://localhost:8081`
- Or replace `{{base_url}}` with actual URL in requests

### "Invalid JWT token"
- Token may have expired (24 hour limit)
- Try logging in again
- Check token format: `Bearer <token>`

### "Email already registered"
- Use different email address
- Or test with existing account

### "Hospital not verified"
- Admin must verify using `/api/admin/hospitals/{id}/verify`
- Requires ADMIN role

## 🌐 Alternative Testing Methods

### 1. Swagger UI
```
http://localhost:8081/swagger-ui.html
```
- Interactive API documentation
- Try endpoints directly in browser
- See request/response schemas

### 2. cURL Commands
```bash
curl -X POST http://localhost:8081/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Pass@123","fullName":"Test User",...}'
```

### 3. Direct HTTP Requests
Use any HTTP client (VS Code REST Client, Thunder Client, etc.)

## 📞 Support

For issues:
1. Check POSTMAN_README.md for detailed help
2. Review POSTMAN_TEST_DATA.json for examples
3. Visit Swagger UI at http://localhost:8081/swagger-ui.html
4. Check server logs for error details

## ✨ Features

✅ 34 endpoints total
✅ All CRUD operations
✅ Complete authentication flow
✅ Hospital management
✅ Admin operations  
✅ Role & permission management
✅ Sample test data included
✅ Error handling examples
✅ Variable substitution
✅ Organized by functionality

---

**Created:** 2026-03-22
**Version:** 1.0.0
**Status:** Ready to use
