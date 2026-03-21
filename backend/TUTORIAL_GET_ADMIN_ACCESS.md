# Tutorial: Step-by-Step Guide to Getting Admin Access

## Prerequisites

- Running Blood Donation Backend (port 8081)
- PostgreSQL database running
- Postman or curl installed
- Database client (pgAdmin, DBeaver, or similar)

---

## 🎯 Complete Walkthrough

### Part 1: Create and Register a User (5 minutes)

#### Step 1.1: Open Postman and Create New Request

1. Open Postman
2. Create a new **POST** request to: `http://localhost:8081/api/users/register`
3. Set **Headers**:
   - Content-Type: application/json

#### Step 1.2: Register User Request Body

Copy and paste this JSON:

```json
{
  "fullName": "Admin Developer",
  "email": "admin.dev@test.com",
  "password": "AdminPass@12345",
  "dateOfBirth": "1990-05-15",
  "address": "123 Main Street, Downtown",
  "phone": "+1234567890",
  "bloodType": "O_POSITIVE"
}
```

**Important Notes:**
- **Email**: Must be unique (change if you've done this before)
- **Password**: Must have:
  - At least 8 characters
  - 1 uppercase letter (A-Z)
  - 1 lowercase letter (a-z)
  - 1 number (0-9)
  - 1 special character (@, #, $, etc.)

#### Step 1.3: Send Registration Request

Click **Send** and verify you get response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "status": 200
}
```

✅ **User is now registered and waiting for email verification**

---

### Part 2: Verify Email with OTP (2 minutes)

#### Step 2.1: Get OTP from Email or Logs

**In Development**: 
- Check application logs for OTP (printed in console)
- Or check your email inbox (if email is configured)
- Format: 6 digits (e.g., `123456`)

**OTP Details:**
- Valid for: 10 minutes
- Max attempts: 3 failed attempts
- Rate limit: 5 requests per hour per email

#### Step 2.2: Verify OTP Request

Create a new **POST** request to: `http://localhost:8081/api/users/verify-otp`

Set **Headers**:
- Content-Type: application/json

Request Body:

```json
{
  "email": "admin.dev@test.com",
  "otp": "123456"
}
```

Click **Send** and verify response:

```json
{
  "success": true,
  "message": "Email verified successfully",
  "status": 200
}
```

✅ **Email is now verified and user can login**

---

### Part 3: Login and Get JWT Token (1 minute)

#### Step 3.1: Login Request

Create a new **POST** request to: `http://localhost:8081/api/users/login`

Set **Headers**:
- Content-Type: application/json

Request Body:

```json
{
  "email": "admin.dev@test.com",
  "password": "AdminPass@12345"
}
```

#### Step 3.2: Get JWT Token from Response

Click **Send** and you'll receive:

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIERldmVsb3BlciIsImlhdCI6MTUxNjIzOTAyMn0.5mpsQiZ3-A-1-Xz4H4U3KfGbCuHbU5Q4K4K6H3K7K8K",
  "user": {
    "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "email": "admin.dev@test.com",
    "fullName": "Admin Developer",
    "role": "USER",
    "isActive": true,
    "emailVerified": true
  },
  "status": 200
}
```

**Important:** Copy the long `token` value - you'll need it next!

💾 **Save the token somewhere temporarily**

---

### Part 4: Get User ID from Profile (1 minute)

#### Step 4.1: Call Get Profile Endpoint

Create a new **GET** request to: `http://localhost:8081/api/users/profile`

Set **Headers**:
- Content-Type: application/json
- Authorization: Bearer {paste-your-token-here}

Example:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIERldmVsb3BlciIsImlhdCI6MTUxNjIzOTAyMn0.5mpsQiZ3-A-1-Xz4H4U3KfGbCuHbU5Q4K4K6H3K7K8K
```

#### Step 4.2: Extract User ID

Response will show:

```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "admin.dev@test.com",
    "fullName": "Admin Developer",
    "role": "USER",
    "userRoles": [],
    ...
  }
}
```

**Copy the `id` field** - you'll need this for database query

💾 **Save this ID: `550e8400-e29b-41d4-a716-446655440000`**

---

### Part 5: Get Role IDs from Database (2 minutes)

#### Step 5.1: Open Database Client

**Option A: pgAdmin (if you have it)**
1. Open pgAdmin web interface (usually http://localhost:5050)
2. Navigate to: Databases → blood_donation → Tables
3. Find table: `user_roles`

**Option B: DBeaver**
1. Open DBeaver
2. Connect to PostgreSQL
3. Navigate to Tables → user_roles

**Option C: Command Line**
```bash
psql -U your_db_user -d blood_donation_db
```

#### Step 5.2: Query for Role IDs

Run this SQL query:

```sql
SELECT id, role_name, description FROM user_roles;
```

You should see output like:

| id | role_name | description |
|---|---|---|
| `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` | SUPER_ADMIN | System Administrator with full access |
| `yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy` | ADMIN | Hospital/Organization Administrator |
| `zzzzzzzz-zzzz-zzzz-zzzz-zzzzzzzzzzzz` | HOSPITAL | Hospital Staff Member |
| `aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa` | USER | Regular Donor |

💾 **Copy the ADMIN role ID: `yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy`**

---

### Part 6: Assign Admin Role to User (1 minute)

#### Step 6.1: Insert Role Assignment

Run this SQL query in your database client:

```sql
INSERT INTO user_role_assignment (user_id, role_id)
VALUES (
  '550e8400-e29b-41d4-a716-446655440000',  -- Your user ID from Step 4
  'yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy'   -- ADMIN role ID from Step 5
);
```

Expected output:
```
Query returned successfully with no result in <time>ms.
```

#### Step 6.2: Verify Assignment

Run this query to confirm:

```sql
SELECT 
  u.email,
  ur.role_name,
  ur.description
FROM user_role_assignment ura
JOIN users u ON ura.user_id = u.id
JOIN user_roles ur ON ura.role_id = ur.id
WHERE u.email = 'admin.dev@test.com';
```

Expected output:

| email | role_name | description |
|---|---|---|
| admin.dev@test.com | ADMIN | Hospital/Organization Administrator |

✅ **Role assignment successful!**

---

### Part 7: Test Admin Access (1 minute)

#### Step 7.1: Try Admin Endpoint

Create a new **GET** request to: `http://localhost:8081/api/admin/hospitals`

Set **Headers**:
- Content-Type: application/json
- Authorization: Bearer {your-token-from-step-3}

#### Step 7.2: Verify Success

Click **Send** and you should get:

```json
{
  "success": true,
  "data": [
    {
      "id": "hospital-1",
      "name": "Central Hospital",
      "location": "Downtown",
      ...
    },
    ...
  ],
  "status": 200
}
```

🎉 **You now have admin access!**

If you got `403 Forbidden` instead, something went wrong. Check:
1. Token is correct and not expired
2. Email matches what you used
3. SQL INSERT was successful (run the verification query again)

---

## 🔍 Troubleshooting

### Issue: "401 Unauthorized" on Admin Endpoint

**Problem:** JWT token is invalid or expired

**Solution:**
1. Get a new token (redo Step 3)
2. Make sure Authorization header format is exactly: `Bearer {token}`
3. No extra spaces or newlines in the token

### Issue: "403 Forbidden" on Admin Endpoint

**Problem:** User doesn't have ADMIN role assigned

**Solution:**
1. Verify role assignment with SQL query:
   ```sql
   SELECT COUNT(*) FROM user_role_assignment 
   WHERE user_id = 'your-user-id' 
   AND role_id = 'admin-role-id';
   ```
   Should return: 1
   
2. If it returns 0, redo Step 6

3. If it returns more than 1, you have duplicate assignments

### Issue: "User not found" on Profile Request

**Problem:** User doesn't exist or token is invalid

**Solution:**
1. Check if user exists:
   ```sql
   SELECT email FROM users WHERE email = 'admin.dev@test.com';
   ```

2. If no result, user doesn't exist - redo Part 1

3. If user exists, get a new token (redo Step 3)

### Issue: "Invalid email format"

**Problem:** Email validation failed

**Solution:**
- Email must be valid format (e.g., user@example.com)
- Check for typos or extra spaces

### Issue: "Password does not meet requirements"

**Problem:** Password doesn't meet complexity requirements

**Solution:**
Password must have:
- ✅ Minimum 8 characters
- ✅ At least 1 UPPERCASE letter (A-Z)
- ✅ At least 1 lowercase letter (a-z)
- ✅ At least 1 number (0-9)
- ✅ At least 1 special character (@#$%^&*)

Example valid password: `AdminPass@123`

---

## ⏱️ Time Summary

| Step | Task | Time |
|------|------|------|
| 1 | Register User | 5 min |
| 2 | Verify OTP | 2 min |
| 3 | Login | 1 min |
| 4 | Get User ID | 1 min |
| 5 | Get Role ID from DB | 2 min |
| 6 | Assign Role | 1 min |
| 7 | Test Access | 1 min |
| **TOTAL** | **Complete Process** | **~13 min** |

---

## 📊 What You Can Do Now

Once you have ADMIN role, you can access these endpoints:

### User Management
```bash
GET /api/admin/users
POST /api/admin/users
GET /api/admin/users/{id}
PUT /api/admin/users/{id}
DELETE /api/admin/users/{id}
```

### Hospital Management
```bash
GET /api/admin/hospitals
POST /api/admin/hospitals
GET /api/admin/hospitals/{id}
PUT /api/admin/hospitals/{id}
PUT /api/admin/hospitals/{id}/verify
```

### Role & Permission Management
```bash
GET /api/admin/roles
GET /api/admin/permissions
```

### Data Export
```bash
GET /api/admin/export/donations
GET /api/admin/export/users
GET /api/admin/analytics/reports
```

---

## 🔐 What ADMIN Cannot Do

These are SUPER_ADMIN only:

- Delete other admins
- Manage role permissions
- Assign SUPER_ADMIN role to users
- Delete hospitals or users permanently
- System-wide analytics
- Override permission checks

---

## 💡 Pro Tips

### Tip 1: Keep Token in Postman Variable
```
Settings → Variables → Add new variable
- Variable: admin_token
- Value: {paste-your-token}
- Then use: {{admin_token}} in Authorization header
```

### Tip 2: Test All Admin Endpoints
Create a Postman Collection with all admin endpoints:
- POST to create new admin
- GET to list all admins
- PUT to update admin
- DELETE to remove admin

### Tip 3: Monitor Logs
Keep terminal window visible to see:
- Permission checks
- Database queries
- Any errors

### Tip 4: Document Your Test Users
Keep a spreadsheet with:
- Email
- Password
- User ID
- Role assigned
- Test date

---

## 🎓 Learning Resources

### Understanding RBAC
Read: `ROLE_AND_PERMISSION_STRUCTURE.md`
- See how roles map to permissions
- Understand permission enforcement
- View database schema

### All Available Endpoints
Read: `HOW_TO_GET_ADMIN_ACCESS.md`
- Full endpoint documentation
- Permission requirements
- Security notes

### Quick Reference
Read: `ADMIN_ACCESS_QUICK_REFERENCE.md`
- Command-line examples
- SQL queries
- Troubleshooting

---

## ✅ Checklist

Before you start:
- [ ] Backend is running on port 8081
- [ ] PostgreSQL is running
- [ ] Database is initialized
- [ ] Postman is installed

After Step 1:
- [ ] User registration succeeded
- [ ] Got 200 response

After Step 2:
- [ ] Email verified
- [ ] OTP accepted

After Step 3:
- [ ] Login successful
- [ ] JWT token received

After Step 4:
- [ ] Profile endpoint works
- [ ] User ID extracted

After Step 5:
- [ ] Connected to database
- [ ] ADMIN role ID found

After Step 6:
- [ ] SQL INSERT executed
- [ ] Verification query successful

After Step 7:
- [ ] Admin endpoint returned 200
- [ ] Data received successfully
- [ ] Admin access confirmed ✅

---

## 🚀 Next Steps

Once you have admin access:

1. **Create test hospitals**
   ```bash
   POST /api/admin/hospitals
   ```

2. **Create test users with different roles**
   ```bash
   POST /api/admin/users
   ```

3. **Test permission enforcement**
   - Try endpoints that require ADMIN permission
   - Verify you can access them
   - Create new user without ADMIN role
   - Try same endpoints - should get 403

4. **Explore admin features**
   - Hospital verification
   - User management
   - Analytics and reporting
   - Data export

5. **Get SUPER_ADMIN if needed**
   - Follow same steps with SUPER_ADMIN role ID
   - See what additional capabilities you get

---

## 📞 Getting Help

If something doesn't work:

1. Check **Troubleshooting** section above
2. Review **HOW_TO_GET_ADMIN_ACCESS.md** for detailed explanations
3. Check application logs for error messages
4. Verify database connection and tables exist
5. Make sure all prerequisites are met

---

**Last Updated**: March 21, 2026  
**Created For**: Blood Donation System Backend  
**Target Audience**: Developers, QA Engineers, System Administrators
