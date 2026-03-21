# How to Get Admin or Full Access - Blood Donation System

## 📋 Overview

The Blood Donation System has a **Role-Based Access Control (RBAC)** system with 4 roles and hierarchical permissions:

| Role | Access Level | Description |
|------|-------------|-------------|
| **SUPER_ADMIN** | 🔴 Full System | All 31 permissions - Complete control |
| **ADMIN** | 🟡 High | 20 permissions - Hospital/admin management |
| **HOSPITAL** | 🟢 Medium | 5 permissions - Hospital staff operations |
| **USER** | 🔵 Low | 3 permissions - Regular donor |

---

## 🔑 Method 1: Get Admin Role via Database (Direct)

### When to Use
- Development/Testing environment
- Initial setup or troubleshooting
- Need immediate admin access

### Steps

#### Step 1: Register a User (Normal Flow)
```bash
# 1. Send registration request
POST /api/users/register
{
  "fullName": "John Admin",
  "email": "admin@example.com",
  "password": "SecurePass@123",
  "dateOfBirth": "1990-01-15",
  "address": "123 Main St",
  "phone": "+1234567890",
  "bloodType": "O_POSITIVE"
}

# Response will have status 200
# Email verification required
```

#### Step 2: Verify OTP
```bash
# Wait for OTP email (or check logs in dev)
POST /api/users/verify-otp
{
  "email": "admin@example.com",
  "otp": "123456"  # From email
}
```

#### Step 3: Login to Get JWT Token
```bash
POST /api/users/login
{
  "email": "admin@example.com",
  "password": "SecurePass@123"
}

# Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "admin@example.com",
    "role": "USER"  # Currently USER role
  }
}
```

#### Step 4: Assign ADMIN Role in Database

**Option A: Direct Database Query**

```sql
-- 1. Find the ADMIN role (created at startup)
SELECT id, role_name FROM user_roles WHERE role_name = 'ADMIN';
-- Note the role_id (e.g., 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')

-- 2. Find your user
SELECT id, email FROM users WHERE email = 'admin@example.com';
-- Note the user_id

-- 3. Add user to ADMIN role
INSERT INTO user_role_assignment (user_id, role_id)
VALUES ('your-user-id', 'admin-role-id');

-- 4. Verify assignment
SELECT u.email, ur.role_name 
FROM user_role_assignment ura
JOIN users u ON ura.user_id = u.id
JOIN user_roles ur ON ura.role_id = ur.id
WHERE u.email = 'admin@example.com';
```

**Option B: PostgreSQL GUI Tools**
- Use pgAdmin, DBeaver, or any PostgreSQL client
- Navigate to: `user_role_assignment` table
- Add a new row with:
  - `user_id`: Your user's UUID
  - `role_id`: ADMIN role UUID (from `user_roles` table where `role_name = 'ADMIN'`)

#### Step 5: Verify Admin Access
```bash
# Login again to get fresh JWT token
POST /api/users/login
{
  "email": "admin@example.com",
  "password": "SecurePass@123"
}

# Now try admin endpoint
GET /api/admin/hospitals
Authorization: Bearer {jwt-token-from-login}

# Should return 200 with hospital list
# If not admin, would return 403 Forbidden
```

---

## 🚀 Method 2: Get Admin via API (Programmatic)

### When to Use
- Production environment setup
- Automated admin user creation
- Need to do this without database access

### Current Limitation
**⚠️ Currently, there is NO API endpoint to assign roles to users.**

The system initializes with these default roles at startup:
- SUPER_ADMIN (created at startup)
- ADMIN (created at startup)
- HOSPITAL (created at startup)
- USER (created at startup)

### Workaround - Implement Role Assignment Endpoint

You would need to create a new endpoint in `AdminController.java`:

```java
@PostMapping("/users/{userId}/assign-role")
@RequirePermission(PermissionType.ADMIN_UPDATE)
public ResponseEntity<?> assignRoleToUser(
    @PathVariable UUID userId,
    @RequestBody AssignRoleRequest request) {
    // Implementation here
}

// Request body
{
  "roleId": "role-uuid-here",
  "roleName": "ADMIN"  // or "SUPER_ADMIN", "HOSPITAL"
}
```

---

## 🔓 Method 3: Get SUPER_ADMIN (Full Access)

### Steps

Same as Method 1 (Admin), but assign **SUPER_ADMIN** role:

```sql
-- Find SUPER_ADMIN role
SELECT id FROM user_roles WHERE role_name = 'SUPER_ADMIN';

-- Assign to your user
INSERT INTO user_role_assignment (user_id, role_id)
VALUES ('your-user-id', 'super-admin-role-id');
```

### SUPER_ADMIN Permissions (31 Total)

```
✅ All User Management (7)
✅ All Hospital Management (8)
✅ All Role Management (6)
✅ All Blood Operations (8)
✅ All System Permissions (2)
```

Can access ALL endpoints including:
- User management
- Hospital verification
- Role assignment
- Permission management
- Donation operations
- Reporting and analytics

---

## 📊 Role Hierarchy & Permissions

### SUPER_ADMIN (31 permissions)
```
Permissions:
├── USER_CREATE, USER_READ, USER_UPDATE, USER_DELETE, USER_LIST, USER_VERIFY, USER_CHANGE_PASSWORD (7)
├── HOSPITAL_CREATE, HOSPITAL_READ, HOSPITAL_UPDATE, HOSPITAL_DELETE, HOSPITAL_LIST, HOSPITAL_VERIFY, HOSPITAL_ADMIN_MANAGE, HOSPITAL_BLOOD_UNITS (8)
├── ROLE_CREATE, ROLE_READ, ROLE_UPDATE, ROLE_DELETE, ROLE_MANAGE, PERMISSION_READ (6)
├── DONATION_CREATE, DONATION_READ, DONATION_UPDATE, DONATION_DELETE, DONATION_LIST, BLOOD_INVENTORY_VIEW, BLOOD_INVENTORY_MANAGE, REPORT_GENERATE (8)
└── ADMIN_CREATE, ADMIN_READ, ADMIN_UPDATE, ADMIN_DELETE, ADMIN_LIST, QUEUE_CREATE, QUEUE_READ, ANALYTICS_VIEW, EXPORT_DATA (9)
```

### ADMIN (20 permissions)
```
✅ ADMIN_CREATE, ADMIN_READ, ADMIN_UPDATE, ADMIN_LIST
✅ HOSPITAL_CREATE, HOSPITAL_READ, HOSPITAL_UPDATE, HOSPITAL_LIST
✅ USER_CREATE, USER_READ, USER_LIST
✅ DONATION_CREATE, DONATION_READ, DONATION_UPDATE, DONATION_LIST
✅ QUEUE_CREATE, QUEUE_READ
✅ REPORT_VIEW, ANALYTICS_VIEW
✅ EXPORT_DATA
```

### HOSPITAL (5 permissions)
```
✅ HOSPITAL_READ
✅ DONATION_READ, DONATION_CREATE
✅ QUEUE_READ
✅ REPORT_VIEW
```

### USER (3 permissions)
```
✅ USER_READ
✅ DONATION_CREATE, DONATION_READ
```

---

## 🛡️ Security Notes

### Default System Behavior
- **All new users start as USER role** (lowest permission level)
- Roles are managed by SUPER_ADMIN or ADMIN users
- No self-promotion is allowed (AspectJ prevents unauthorized role assignment)
- All permission checks are enforced via @RequirePermission aspect

### Why No Direct API for Role Assignment?
1. **Security**: Prevents unauthorized privilege escalation
2. **Audit Trail**: Database operations are easier to log
3. **Intentional Design**: Requires system admin intervention for role changes

---

## 🔍 Verify Your Role/Permissions

### Check Current User's Roles
```bash
GET /api/users/profile
Authorization: Bearer {jwt-token}

Response:
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "admin@example.com",
  "role": "USER",
  "userRoles": [
    {
      "id": "admin-role-id",
      "roleName": "ADMIN",
      "permissions": [
        {
          "permissionType": "ADMIN_CREATE",
          "description": "Create admin users"
        },
        // ... more permissions
      ]
    }
  ]
}
```

### Check if You Can Access Admin Endpoints
```bash
# Try an admin-only endpoint
GET /api/admin/hospitals
Authorization: Bearer {jwt-token}

# If admin: Returns 200 with hospital list
# If not admin: Returns 403 with error
{
  "success": false,
  "message": "You do not have permission to perform this action",
  "error_code": "INSUFFICIENT_PERMISSION",
  "status": 403
}
```

---

## 📍 Database Tables for Role Management

### user_roles Table
```sql
SELECT * FROM user_roles;

Columns:
- id (UUID)
- role_name (ENUM: SUPER_ADMIN, ADMIN, HOSPITAL, USER)
- description (TEXT)
- is_active (BOOLEAN)
- created_date, updated_date (TIMESTAMP)
```

### user_role_assignment Table
```sql
SELECT * FROM user_role_assignment;

Columns:
- user_id (UUID) - Foreign key to users table
- role_id (UUID) - Foreign key to user_roles table
```

### role_permissions Table
```sql
SELECT * FROM role_permissions;

Columns:
- role_id (UUID) - Foreign key to user_roles table
- permission_id (UUID) - Foreign key to permissions table
```

### Query to See All Users and Their Roles
```sql
SELECT 
  u.email,
  u.role AS simple_role,
  ur.role_name AS assigned_role_name,
  COUNT(rp.permission_id) as permission_count
FROM users u
LEFT JOIN user_role_assignment ura ON u.id = ura.user_id
LEFT JOIN user_roles ur ON ura.role_id = ur.id
LEFT JOIN role_permissions rp ON ur.id = rp.role_id
GROUP BY u.id, u.email, u.role, ur.role_name
ORDER BY u.created_date DESC;
```

---

## ⚙️ Admin Endpoints (After Getting Admin Access)

Once you have ADMIN role, you can access:

### User Management
```bash
GET /api/admin/users              # List all users
POST /api/admin/users             # Create new user
GET /api/admin/users/{id}         # Get specific user
PUT /api/admin/users/{id}         # Update user
DELETE /api/admin/users/{id}      # Delete user
```

### Hospital Management
```bash
GET /api/admin/hospitals          # List hospitals
POST /api/admin/hospitals         # Create hospital
GET /api/admin/hospitals/{id}     # Get hospital
PUT /api/admin/hospitals/{id}     # Update hospital
PUT /api/admin/hospitals/{id}/verify  # Verify hospital
```

### Role Management
```bash
GET /api/admin/roles              # List roles
GET /api/admin/permissions        # List permissions
```

### Hospital Admin Endpoints
```bash
GET /api/hospitals/{id}/admins    # Get hospital admins
PUT /api/hospitals/{id}/coordinator  # Assign coordinator
```

---

## 🧪 Test Cases

### Test Case 1: Get Admin via Database
**Prerequisite**: Access to development database

1. Register user at `POST /api/users/register`
2. Verify OTP at `POST /api/users/verify-otp`
3. Login at `POST /api/users/login`
4. Get user UUID from profile: `GET /api/users/profile`
5. In database, find ADMIN role UUID:
   ```sql
   SELECT id FROM user_roles WHERE role_name = 'ADMIN';
   ```
6. Insert assignment:
   ```sql
   INSERT INTO user_role_assignment VALUES (user_uuid, admin_role_uuid);
   ```
7. Verify by accessing admin endpoint: `GET /api/admin/hospitals`

**Expected Result**: 200 status with hospital list

### Test Case 2: Verify Permission Enforcement
1. With USER role: `GET /api/admin/hospitals` → 403 Forbidden
2. Assign ADMIN role in database
3. With ADMIN role: `GET /api/admin/hospitals` → 200 OK

---

## 📚 Reference Files

- Role Model: `src/main/java/com/setec/backend/Model/UserRole.java`
- User Model: `src/main/java/com/setec/backend/Model/users.java`
- Role Service: `src/main/java/com/setec/backend/Service/Serviceimpl/RoleServiceImpl.java`
- Permission Service: `src/main/java/com/setec/backend/Service/Serviceimpl/PermissionServiceImpl.java`
- Permission Validator: `src/main/java/com/setec/backend/Security/PermissionValidator.java`
- Admin Controller: `src/main/java/com/setec/backend/Controller/AdminController.java`

---

## 🎯 Quick Summary

| Goal | Method | Steps | Time |
|------|--------|-------|------|
| Get **ADMIN** access (non-production) | Database | Register → Verify OTP → DB query → Assign role | 5 min |
| Get **SUPER_ADMIN** access | Database | Same as above, assign SUPER_ADMIN role | 5 min |
| Get **ADMIN** access (production) | Build API endpoint | Create new endpoint, deploy, use API | 1 hour |
| Verify you have admin | API call | `GET /api/admin/hospitals` with JWT token | 30 sec |

---

## ❓ FAQ

**Q: Can I promote myself to ADMIN without database access?**
A: Currently NO. There's no API endpoint for role assignment. You need either:
1. Database access (easiest)
2. Someone with SUPER_ADMIN to implement and call an API endpoint

**Q: What permissions do I need to assign roles to others?**
A: You need ADMIN_UPDATE permission, which comes with ADMIN role.

**Q: Can ADMIN users create SUPER_ADMIN users?**
A: No. ADMIN users can manage other users but cannot assign roles. Only SUPER_ADMIN can do that.

**Q: Will my admin role persist after restart?**
A: YES. Roles are stored in the database and loaded on every restart.

**Q: What if I delete my role from user_role_assignment table?**
A: You'll lose your admin access. You'd need database access again to restore it.

---

## 🚀 Recommendations

### For Development
1. Use database method to quickly assign admin role
2. Create test users with different roles
3. Test permission enforcement

### For Production
1. Implement API endpoint for role assignment (with proper authorization checks)
2. Implement audit logging for role changes
3. Consider requiring approval workflow for role changes
4. Set up alerts for SUPER_ADMIN role assignments

---

**Last Updated**: March 21, 2026
**Version**: 1.0
**Status**: Documentation Complete
