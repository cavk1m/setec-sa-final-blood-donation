# Blood Donation System - Role & Permission Structure

## 🎯 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│              ROLE-BASED ACCESS CONTROL (RBAC)               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  🔴 SUPER_ADMIN (31 permissions) ← Full System Access       │
│     ├─ User Management (7)                                   │
│     ├─ Hospital Management (8)                               │
│     ├─ Role Management (6)                                   │
│     ├─ Blood Operations (8)                                  │
│     └─ System Admin (2)                                      │
│                                                               │
│  🟡 ADMIN (20 permissions) ← Organization Admin             │
│     ├─ Admin Operations (4)                                  │
│     ├─ Hospital Management (4)                               │
│     ├─ User Management (3)                                   │
│     ├─ Donation Operations (4)                               │
│     ├─ Queue Management (2)                                  │
│     ├─ Reporting (2)                                         │
│     └─ Export Data (1)                                       │
│                                                               │
│  🟢 HOSPITAL (5 permissions) ← Hospital Staff               │
│     ├─ Hospital Read (1)                                     │
│     ├─ Donation Management (2)                               │
│     ├─ Queue Management (1)                                  │
│     └─ Reporting (1)                                         │
│                                                               │
│  🔵 USER (3 permissions) ← Regular Donor                    │
│     ├─ Profile Read (1)                                      │
│     └─ Donation Operations (2)                               │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Permission Matrix

| Permission Type | SUPER_ADMIN | ADMIN | HOSPITAL | USER | Purpose |
|---|---|---|---|---|---|
| **USER_CREATE** | ✅ | ✅ | ❌ | ❌ | Create new users |
| **USER_READ** | ✅ | ✅ | ❌ | ✅ | View user profile |
| **USER_UPDATE** | ✅ | ❌ | ❌ | ❌ | Update user data |
| **USER_DELETE** | ✅ | ❌ | ❌ | ❌ | Delete users |
| **USER_LIST** | ✅ | ✅ | ❌ | ❌ | List all users |
| **USER_VERIFY** | ✅ | ❌ | ❌ | ❌ | Verify email |
| **USER_CHANGE_PASSWORD** | ✅ | ❌ | ❌ | ❌ | Reset password |
| **HOSPITAL_CREATE** | ✅ | ✅ | ❌ | ❌ | Create hospital |
| **HOSPITAL_READ** | ✅ | ✅ | ✅ | ❌ | View hospital |
| **HOSPITAL_UPDATE** | ✅ | ✅ | ❌ | ❌ | Update hospital |
| **HOSPITAL_DELETE** | ✅ | ❌ | ❌ | ❌ | Delete hospital |
| **HOSPITAL_LIST** | ✅ | ✅ | ❌ | ❌ | List hospitals |
| **HOSPITAL_VERIFY** | ✅ | ❌ | ❌ | ❌ | Verify hospital |
| **HOSPITAL_ADMIN_MANAGE** | ✅ | ❌ | ❌ | ❌ | Manage admins |
| **HOSPITAL_BLOOD_UNITS** | ✅ | ❌ | ❌ | ❌ | Manage blood units |
| **ROLE_CREATE** | ✅ | ❌ | ❌ | ❌ | Create roles |
| **ROLE_READ** | ✅ | ❌ | ❌ | ❌ | View roles |
| **ROLE_UPDATE** | ✅ | ❌ | ❌ | ❌ | Update roles |
| **ROLE_DELETE** | ✅ | ❌ | ❌ | ❌ | Delete roles |
| **ROLE_MANAGE** | ✅ | ❌ | ❌ | ❌ | Assign roles |
| **DONATION_CREATE** | ✅ | ✅ | ✅ | ✅ | Create donation |
| **DONATION_READ** | ✅ | ✅ | ✅ | ✅ | View donation |
| **DONATION_UPDATE** | ✅ | ✅ | ❌ | ❌ | Update donation |
| **DONATION_DELETE** | ✅ | ❌ | ❌ | ❌ | Delete donation |
| **DONATION_LIST** | ✅ | ✅ | ❌ | ❌ | List donations |
| **BLOOD_INVENTORY_VIEW** | ✅ | ❌ | ❌ | ❌ | View inventory |
| **BLOOD_INVENTORY_MANAGE** | ✅ | ❌ | ❌ | ❌ | Manage inventory |
| **REPORT_GENERATE** | ✅ | ❌ | ❌ | ❌ | Generate reports |
| **ADMIN_CREATE** | ✅ | ❌ | ❌ | ❌ | Create admin |
| **ADMIN_READ** | ✅ | ✅ | ❌ | ❌ | View admin |
| **ADMIN_UPDATE** | ✅ | ✅ | ❌ | ❌ | Update admin |
| **ADMIN_DELETE** | ✅ | ❌ | ❌ | ❌ | Delete admin |
| **ADMIN_LIST** | ✅ | ✅ | ❌ | ❌ | List admins |
| **QUEUE_CREATE** | ✅ | ✅ | ❌ | ❌ | Create queue |
| **QUEUE_READ** | ✅ | ✅ | ✅ | ❌ | View queue |
| **REPORT_VIEW** | ✅ | ✅ | ✅ | ❌ | View reports |
| **ANALYTICS_VIEW** | ✅ | ✅ | ❌ | ❌ | View analytics |
| **EXPORT_DATA** | ✅ | ✅ | ❌ | ❌ | Export data |
| **PERMISSION_READ** | ✅ | ❌ | ❌ | ❌ | View permissions |

## 🔄 How Roles are Stored

### Database Tables

```sql
┌──────────────────────────────────────────────────┐
│           users (User Accounts)                  │
├──────────────────────────────────────────────────┤
│ id (UUID)                                        │
│ email (UNIQUE)                                   │
│ password_hash                                    │
│ full_name                                        │
│ phone                                            │
│ role (ENUM: ADMIN, USER, DONOR, etc.)           │
│ email_verified (BOOLEAN)                         │
│ is_active (BOOLEAN)                              │
│ created_date, updated_date                       │
└──────────────────────────────────────────────────┘
          ↓ (ManyToMany through junction table)
┌──────────────────────────────────────────────────┐
│      user_role_assignment (Junction)             │
├──────────────────────────────────────────────────┤
│ user_id (FK → users.id)                          │
│ role_id (FK → user_roles.id)                     │
└──────────────────────────────────────────────────┘
          ↓
┌──────────────────────────────────────────────────┐
│      user_roles (Role Definitions)               │
├──────────────────────────────────────────────────┤
│ id (UUID)                                        │
│ role_name (ENUM: SUPER_ADMIN, ADMIN, etc.)      │
│ description (TEXT)                               │
│ is_active (BOOLEAN)                              │
│ created_date, updated_date                       │
└──────────────────────────────────────────────────┘
          ↓ (ManyToMany through junction table)
┌──────────────────────────────────────────────────┐
│     role_permissions (Junction)                  │
├──────────────────────────────────────────────────┤
│ role_id (FK → user_roles.id)                     │
│ permission_id (FK → permissions.id)              │
└──────────────────────────────────────────────────┘
          ↓
┌──────────────────────────────────────────────────┐
│      permissions (Permission Definitions)        │
├──────────────────────────────────────────────────┤
│ id (UUID)                                        │
│ permission_type (ENUM)                           │
│ description (TEXT)                               │
│ resource_name (STRING)                           │
│ action (STRING)                                  │
│ is_active (BOOLEAN)                              │
│ created_date, updated_date                       │
└──────────────────────────────────────────────────┘
```

## 🔐 How Permission Checking Works

```
┌─────────────────┐
│   API Request   │
│  with JWT Token │
└────────┬────────┘
         ↓
┌─────────────────────────────────────┐
│  1. JWT Validation                  │
│     └─ Token valid? Valid signature?│
│     └─ Not expired?                 │
└────────┬────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│  2. Extract User & Roles            │
│     └─ Get user_id from JWT         │
│     └─ Query user_role_assignment   │
│     └─ Get all role_ids             │
└────────┬────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│  3. Check @RequirePermission        │
│     └─ Query role_permissions       │
│     └─ For each role, get perms     │
│     └─ Check if required perm in set│
└────────┬────────────────────────────┘
         ↓
       ✅ YES / ❌ NO
       
    If YES: Execute endpoint
    If NO:  Return 403 Forbidden
```

## 🎬 Getting Admin Access - Process Flow

```
┌─ Step 1: Register User ─────────────────────┐
│ POST /api/users/register                     │
│ → Creates user with role = USER              │
│ → Sends OTP to email                         │
└──────────────────────────────────────────────┘
              ↓
┌─ Step 2: Verify OTP ────────────────────────┐
│ POST /api/users/verify-otp                   │
│ → Validates 6-digit OTP                      │
│ → Sets email_verified = true                 │
└──────────────────────────────────────────────┘
              ↓
┌─ Step 3: Login ─────────────────────────────┐
│ POST /api/users/login                        │
│ → Returns JWT token with user_id in claims   │
│ → User can now access protected endpoints    │
│ → But can't access admin endpoints yet       │
└──────────────────────────────────────────────┘
              ↓
┌─ Step 4: Database - Assign Role ────────────┐
│ 1. Get user_id from users table (from Step 3)│
│ 2. Get role_id from user_roles where         │
│    role_name = 'ADMIN'                       │
│ 3. INSERT into user_role_assignment          │
│    (user_id, role_id)                        │
└──────────────────────────────────────────────┘
              ↓
┌─ Step 5: Verify Access ─────────────────────┐
│ GET /api/admin/hospitals                     │
│ + Authorization: Bearer {JWT}                │
│ → Permission check passes ✅                 │
│ → Returns 200 with hospital list             │
└──────────────────────────────────────────────┘
```

## 🛡️ Security Enforcement

### AspectJ Aspect Interception

```java
@Aspect
public class PermissionValidator {
    
    @Around("@annotation(requirePermission)")
    public Object validatePermission(
        ProceedingJoinPoint joinPoint,
        RequirePermission requirePermission) {
        
        // 1. Get current user from JWT
        User user = getCurrentUser();
        
        // 2. Get required permission
        PermissionType requiredPerm = requirePermission.value();
        
        // 3. Check if user has permission
        if (user.hasPermission(requiredPerm)) {
            return joinPoint.proceed();  // ✅ Continue
        } else {
            throw new InsufficientPermissionException();  // ❌ 403
        }
    }
}
```

### Endpoint Protection

```java
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    
    @GetMapping("/hospitals")
    @RequirePermission(PermissionType.HOSPITAL_LIST)  // ← Requires this permission
    public ResponseEntity<?> listHospitals() {
        // Only SUPER_ADMIN and ADMIN can reach here
        return ResponseEntity.ok(hospitalService.getAll());
    }
}
```

## 📈 Access Level Comparison

| Operation | USER | HOSPITAL | ADMIN | SUPER_ADMIN |
|---|---|---|---|---|
| View own profile | ✅ | ✅ | ✅ | ✅ |
| Update own profile | ✅ | ✅ | ✅ | ✅ |
| Create donation | ✅ | ✅ | ✅ | ✅ |
| List all hospitals | ❌ | ❌ | ✅ | ✅ |
| Create hospital | ❌ | ❌ | ✅ | ✅ |
| Verify hospital | ❌ | ❌ | ❌ | ✅ |
| List all users | ❌ | ❌ | ✅ | ✅ |
| Create user | ❌ | ❌ | ✅ | ✅ |
| Manage roles | ❌ | ❌ | ❌ | ✅ |
| Manage permissions | ❌ | ❌ | ❌ | ✅ |
| View analytics | ❌ | ❌ | ✅ | ✅ |
| Export data | ❌ | ❌ | ✅ | ✅ |

## 🔍 How to Verify Your Role

### Check Current User's Permissions
```bash
GET /api/users/profile
Authorization: Bearer {JWT_TOKEN}

Response:
{
  "id": "user-id",
  "email": "user@example.com",
  "role": "USER",
  "userRoles": [
    {
      "id": "role-id",
      "roleName": "ADMIN",
      "permissions": [
        {
          "permissionType": "HOSPITAL_LIST",
          "description": "List hospitals"
        },
        // ... more permissions
      ]
    }
  ]
}
```

### Try Admin Endpoint
```bash
GET /api/admin/hospitals
Authorization: Bearer {JWT_TOKEN}

# If you have permission:
200 OK
{
  "hospitals": [...]
}

# If you don't have permission:
403 Forbidden
{
  "success": false,
  "message": "You do not have permission to perform this action",
  "error_code": "INSUFFICIENT_PERMISSION"
}
```

## 📚 Key Files

| File | Purpose |
|------|---------|
| `RoleType.java` | Enum with 4 role types |
| `UserRole.java` | JPA entity for role definitions |
| `Permission.java` | JPA entity for permissions |
| `users.java` | JPA entity for user accounts |
| `RoleServiceImpl.java` | Service to manage roles |
| `PermissionValidator.java` | AspectJ aspect for permission checks |
| `AdminController.java` | Protected admin endpoints |

---

## ✅ Quick Reference

| Task | SQL Command |
|------|-------------|
| Find my user ID | `SELECT id FROM users WHERE email = 'your@email.com';` |
| Find ADMIN role ID | `SELECT id FROM user_roles WHERE role_name = 'ADMIN';` |
| Assign ADMIN to user | `INSERT INTO user_role_assignment VALUES (user_id, admin_role_id);` |
| View all users and roles | `SELECT u.email, ur.role_name FROM users u LEFT JOIN user_role_assignment ura ON u.id = ura.user_id LEFT JOIN user_roles ur ON ura.role_id = ur.id;` |
| Remove admin role | `DELETE FROM user_role_assignment WHERE user_id = '...' AND role_id = '...';` |

---

**Last Updated**: March 21, 2026  
**System Version**: Spring Boot 3.4.3  
**Database**: PostgreSQL 14+
