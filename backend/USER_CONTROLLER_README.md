# Blood Donation System - User Management API

## 🎯 Overview

This is a comprehensive user management system for the Blood Donation application with JWT authentication, OTP verification via Gmail SMTP, and profile picture upload functionality.

## ✨ Features Implemented

### 🔐 Authentication & Authorization
- **JWT-based Authentication** - Stateless authentication with secure tokens
- **OTP Email Verification** - Registration and password reset via Gmail SMTP  
- **Spring Security Integration** - Protected endpoints with role-based access
- **Password Encryption** - BCrypt hashing for secure password storage

### 👤 User Management
- **Complete Registration Flow** - Email OTP verification required
- **Profile Management** - Update personal information, blood type, contact details
- **Password Management** - Change password with current password verification
- **Account Deactivation** - Users can deactivate their own accounts
- **Profile Picture Upload** - Local file storage with validation

### 📧 Email Services  
- **Gmail SMTP Integration** - Professional email templates for OTP delivery
- **Welcome Emails** - Sent after successful registration
- **Password Change Notifications** - Security alerts for password changes
- **Responsive Email Templates** - HTML emails with proper styling

### 🛡️ Security Features
- **Rate Limiting** - OTP request rate limiting (5 requests/hour)
- **Input Validation** - Comprehensive validation for all endpoints
- **File Upload Security** - Type validation, size limits, sanitization
- **CORS Configuration** - Proper cross-origin request handling

## 📋 API Endpoints

### Public Endpoints (No Authentication Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/users/register` | User registration (sends OTP) |
| `POST` | `/api/users/verify-otp` | Verify registration OTP |
| `POST` | `/api/users/login` | User login |
| `POST` | `/api/users/forgot-password` | Request password reset OTP |
| `POST` | `/api/users/reset-password` | Reset password with OTP |

### Protected Endpoints (Authentication Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/users/profile` | Get user profile |
| `PUT` | `/api/users/profile` | Update profile information |
| `POST` | `/api/users/profile/picture` | Upload profile picture |
| `DELETE` | `/api/users/profile/picture` | Remove profile picture |
| `POST` | `/api/users/change-password` | Change password |
| `DELETE` | `/api/users/account` | Deactivate account |

### File Serving

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/uploads/{filename}` | Serve uploaded profile pictures |

## 🏗️ Technical Architecture

### Technology Stack
- **Spring Boot 3.4.3** with Java 17
- **Spring Security** with JWT authentication
- **Spring Data JPA** with PostgreSQL
- **Maven** for dependency management
- **Lombok** for reducing boilerplate code

### Project Structure
```
src/main/java/com/setec/backend/
├── Config/                     # Configuration classes
│   ├── SecurityConfig.java    # Spring Security configuration
│   └── JwtAuthenticationFilter.java  # JWT request filter
├── Controller/
│   └── UserController.java    # User management endpoints
├── Dto/                       # Data Transfer Objects
│   ├── UserRegistrationRequest.java
│   ├── LoginRequest.java
│   ├── AuthResponse.java
│   ├── OtpVerificationRequest.java
│   ├── ChangePasswordRequest.java
│   └── UserResponse.java
├── Model/                     # JPA Entities
│   ├── users.java            # User entity (enhanced)
│   └── otp_codes.java        # OTP verification codes
├── Repository/               # Data access layer
│   ├── UserRepository.java
│   └── OtpRepository.java    # OTP operations
├── Service/                  # Business logic
│   ├── UserService.java     # User operations interface
│   ├── OtpService.java      # OTP generation & verification
│   ├── EmailService.java    # Gmail SMTP email service
│   ├── JwtService.java      # JWT token management
│   └── FileUploadService.java  # File upload handling
└── Exception/
    └── GlobalExceptionHandler.java  # Centralized error handling
```

## 🔧 Configuration

### Database Configuration
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/blood_donation
    username: postgres
    password: Seng@123
```

### Email Configuration (Gmail SMTP)
```yaml
spring:
  mail:
    host: smtp.gmail.com
    port: 587
    username: ${GMAIL_USERNAME:your-email@gmail.com}
    password: ${GMAIL_APP_PASSWORD:your-app-password}
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true
```

### JWT Configuration
```yaml
jwt:
  secret: ${JWT_SECRET:myVerySecretJwtKeyForBloodDonationSystemThatIsLongEnoughForSecurity}
  expiration: 86400000 # 24 hours
```

### File Upload Configuration
```yaml
file:
  upload-dir: ${UPLOAD_DIR:uploads}
  max-size: 5242880 # 5MB
```

## 📝 Usage Examples

### 1. User Registration Flow

#### Step 1: Register User
```bash
POST /api/users/register
Content-Type: application/json

{
  "full_name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "address": "123 Main St",
  "date_of_birth": "1990-01-01",
  "password": "SecurePass123!",
  "blood_type": "A_POSITIVE"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful. Please verify your email with the OTP sent to john.doe@example.com",
  "user_id": "uuid-here",
  "email": "john.doe@example.com"
}
```

#### Step 2: Verify OTP
```bash
POST /api/users/verify-otp
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "otp_code": "123456"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 86400000,
  "user": {
    "id": "uuid-here",
    "full_name": "John Doe",
    "email": "john.doe@example.com",
    "blood_type": "A_POSITIVE",
    "role": "USER",
    "is_active": true
  },
  "message": "Email verified successfully. Welcome to Blood Donation System!"
}
```

### 2. User Login
```bash
POST /api/users/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

### 3. Get Profile (Protected)
```bash
GET /api/users/profile
Authorization: Bearer your-jwt-token-here
```

### 4. Upload Profile Picture (Protected)
```bash
POST /api/users/profile/picture
Authorization: Bearer your-jwt-token-here
Content-Type: multipart/form-data

file: [image file]
```

### 5. Change Password (Protected)
```bash
POST /api/users/change-password
Authorization: Bearer your-jwt-token-here
Content-Type: application/json

{
  "current_password": "SecurePass123!",
  "new_password": "NewSecurePass456!"
}
```

## 🧪 Testing

### Unit Tests Included
- **OtpServiceTest** - OTP generation, verification, cleanup
- **FileUploadServiceTest** - File upload, validation, cleanup  
- **JwtServiceTest** - Token generation, validation, extraction
- **UserControllerTest** - API endpoint integration tests

### Running Tests
```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=OtpServiceTest

# Run with coverage
mvn test jacoco:report
```

## 🚀 Getting Started

### Prerequisites
- Java 17+
- PostgreSQL database
- Gmail account with app password for SMTP
- Maven 3.6+

### Environment Variables
Create `.env` file or set environment variables:
```bash
GMAIL_USERNAME=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
JWT_SECRET=your-very-long-secret-key-here
UPLOAD_DIR=uploads
```

### Running the Application
```bash
# Clone the repository
git clone <repository-url>

# Navigate to backend directory
cd backend

# Install dependencies
mvn clean install

# Run the application
mvn spring-boot:run
```

The application will start on `http://localhost:8081`

## 🔒 Security Considerations

### Implemented Security Measures
- **Password Hashing** - BCrypt with salt
- **JWT Security** - Signed tokens with expiration
- **Rate Limiting** - OTP request throttling  
- **Input Validation** - Comprehensive validation on all endpoints
- **File Upload Security** - Type and size validation
- **CORS Policy** - Configured for cross-origin requests

### Recommended Production Settings
- Use strong JWT secret (32+ characters)
- Enable HTTPS in production
- Set up proper CORS origins (not wildcard)
- Use environment-specific configurations
- Implement request rate limiting
- Set up proper logging and monitoring

## 📧 Email Templates

The system includes professional HTML email templates for:
- **OTP Verification** - Registration, login, password reset
- **Welcome Message** - After successful registration  
- **Password Change Notification** - Security alerts

All emails are responsive and include the blood donation branding.

## 📊 Database Schema Updates

### Users Table Enhancements
- Added `profile_picture_path` field
- Added `email_verified` field  
- Proper indexing for performance

### OTP Codes Table
- Comprehensive OTP management
- Expiration handling
- Rate limiting support

## 🐛 Error Handling

Comprehensive error handling includes:
- **Validation Errors** - Field-specific error messages
- **Authentication Errors** - Proper HTTP status codes
- **File Upload Errors** - Size and type validation
- **Business Logic Errors** - User-friendly messages
- **System Errors** - Proper logging and generic responses

## 📈 Performance Optimizations

- **Database Indexing** - Optimized queries
- **JWT Stateless** - No server-side sessions
- **File Storage** - Local storage with cleanup
- **Connection Pooling** - Database connection management
- **Validation Caching** - Efficient input validation

## 🔮 Future Enhancements

Potential improvements for future versions:
- Two-factor authentication (2FA)
- Social login integration (Google, Facebook)
- Profile picture resizing and optimization
- Email template customization
- Advanced rate limiting
- Audit logging
- Real-time notifications
- Mobile app support

---

## 📞 Support

For questions or issues, please contact the development team or create an issue in the repository.

**Built with ❤️ for the Blood Donation System**