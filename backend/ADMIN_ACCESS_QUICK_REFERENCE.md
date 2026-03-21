# Quick Start - Admin Access (TL;DR)

## 🚀 3-Minute Admin Setup

### Step 1: Register User via API
```bash
curl -X POST http://localhost:8081/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Admin User",
    "email": "admin@test.com",
    "password": "AdminPass@123",
    "dateOfBirth": "1990-01-15",
    "address": "123 Street",
    "phone": "+1234567890",
    "bloodType": "O_POSITIVE"
  }'
```

### Step 2: Verify OTP via API
```bash
curl -X POST http://localhost:8081/api/users/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "otp": "123456"
  }'
```

### Step 3: Get JWT Token via API
```bash
curl -X POST http://localhost:8081/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "AdminPass@123"
  }'

# Copy the token from response
```

### Step 4: Assign Admin Role in Database
```sql
-- Find your user ID
SELECT id FROM users WHERE email = 'admin@test.com';
-- Copy the UUID (e.g., abc123...)

-- Find ADMIN role ID
SELECT id FROM user_roles WHERE role_name = 'ADMIN';
-- Copy the UUID (e.g., def456...)

-- Assign role
INSERT INTO user_role_assignment (user_id, role_id) 
VALUES ('abc123...', 'def456...');
```

### Step 5: Verify Admin Access
```bash
curl -X GET http://localhost:8081/api/admin/hospitals \
  -H "Authorization: Bearer {TOKEN_FROM_STEP_3}"

# Should return 200 with hospital list
```

---

## 📊 Role IDs to Use

### Find Role IDs
```sql
SELECT id, role_name FROM user_roles;
```

| Role | SQL Query |
|------|-----------|
| SUPER_ADMIN | `SELECT id FROM user_roles WHERE role_name = 'SUPER_ADMIN';` |
| ADMIN | `SELECT id FROM user_roles WHERE role_name = 'ADMIN';` |
| HOSPITAL | `SELECT id FROM user_roles WHERE role_name = 'HOSPITAL';` |
| USER | `SELECT id FROM user_roles WHERE role_name = 'USER';` |

---

## ✅ Verify It Worked

```bash
# Should return 200 (success)
curl -X GET http://localhost:8081/api/admin/hospitals \
  -H "Authorization: Bearer {TOKEN}"

# Should return 403 if not admin
curl -X GET http://localhost:8081/api/admin/users \
  -H "Authorization: Bearer {TOKEN}"
```

---

## 🔥 Common Issues

| Issue | Solution |
|-------|----------|
| "OTP not received" | Check logs for OTP or use default `123456` in dev |
| "403 Forbidden" | User doesn't have ADMIN role - redo Step 4 |
| "401 Unauthorized" | JWT token invalid/expired - redo Step 3 |
| "User not found" | Wrong email - check database |

---

## 💾 Reference

- **Database**: PostgreSQL
- **Default Port**: 8081
- **JWT Duration**: 24 hours
- **OTP Duration**: 10 minutes

---

**Done! You now have admin access.** 🎉
