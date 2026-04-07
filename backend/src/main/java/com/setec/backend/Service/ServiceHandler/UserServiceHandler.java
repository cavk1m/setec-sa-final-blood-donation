package com.setec.backend.Service.ServiceHandler;

import com.setec.backend.Model.users;
import org.springframework.util.StringUtils;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
public class UserServiceHandler {

    public static void validationUserPw(String password, String username) {
        if (!StringUtils.hasText(password)) {
            log.info("Password validation failed: Password is empty");
            throw new IllegalArgumentException("Password cannot be empty");
        }

        if (password.length() < 8) {
            log.info("Password validation failed: Less than 8 characters");
            throw new IllegalArgumentException("Password must be at least 8 characters long");
        }

        if (!password.matches(".*[A-Z].*")) {
            log.info("Password validation failed: No uppercase letter");
            throw new IllegalArgumentException("Password must contain at least one uppercase letter");
        }

        if (!password.matches(".*[a-z].*")) {
            log.info("Password validation failed: No lowercase letter");
            throw new IllegalArgumentException("Password must contain at least one lowercase letter");
        }

        if (!password.matches(".*[0-9].*")) {
            log.info("Password validation failed: No digit");
            throw new IllegalArgumentException("Password must contain at least one digit");
        }

        if (!password.matches(".*[@#$%^&+=!].*")) {
            log.info("Password validation failed: No special character");
            throw new IllegalArgumentException("Password must contain at least one special character (@#$%^&+=!)");
        }

        if (StringUtils.hasText(username) &&
                password.toLowerCase().contains(username.toLowerCase())) {
            log.info("Password validation failed: Contains username");
            throw new IllegalArgumentException("Password cannot contain your username");
        }

        log.info("Password validation passed");
    }

    public static void otpValidation(String otp) {
        if (!StringUtils.hasText(otp)) {
            log.info("OTP validation failed: OTP is empty");
            throw new IllegalArgumentException("OTP cannot be empty");
        }

        if (otp.length() < 4 || otp.length() > 6) {
            log.info("OTP validation failed: Invalid length - {}", otp.length());
            throw new IllegalArgumentException("OTP must be 4-6 digits long");
        }

        if (!otp.matches("\\d+")) {
            log.info("OTP validation failed: Contains non-digit characters");
            throw new IllegalArgumentException("OTP must contain only digits");
        }

        log.info("OTP validation passed");
    }

    public static void validationEmail(String email) {
        if (!StringUtils.hasText(email)) {
            log.info("Email validation failed: Email is empty");
            throw new IllegalArgumentException("Email cannot be empty");
        }

        email = email.trim().toLowerCase();

        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        if (!email.matches(emailRegex)) {
            log.info("Email validation failed: Invalid format - {}", maskEmail(email));
            throw new IllegalArgumentException("Invalid email format");
        }

        if (email.length() > 254) {
            log.info("Email validation failed: Too long - {} characters", email.length());
            throw new IllegalArgumentException("Email is too long (maximum 254 characters)");
        }

        String localPart = email.substring(0, email.indexOf('@'));
        if (localPart.length() > 64) {
            log.info("Email validation failed: Local part too long - {} characters", localPart.length());
            throw new IllegalArgumentException("Email username part is too long (maximum 64 characters)");
        }

        log.info("Email validation passed for: {}", maskEmail(email));
    }

    public static void validatePhone(String phone) {
        if (!StringUtils.hasText(phone)) {
            log.info("Phone validation failed: Phone number is empty");
            throw new IllegalArgumentException("Phone number cannot be empty");
        }

        String digitsOnly = phone.replaceAll("[^0-9]", "");

        if (phone.length() > 12) {
            log.info("Phone validation failed: Too long - {} characters", phone.length());
            throw new IllegalArgumentException("Phone number must not exceed 12 characters (including formatting)");
        }

        if (digitsOnly.length() < 10) {
            log.info("Phone validation failed: Only {} digits, minimum 10 required", digitsOnly.length());
            throw new IllegalArgumentException("Phone number must contain at least 10 digits");
        }

        if (digitsOnly.length() > 11) {
            log.info("Phone validation failed: Too many digits - {}", digitsOnly.length());
            throw new IllegalArgumentException("Phone number must not exceed 11 digits");
        }

        log.info("Basic phone validation passed for: {}", maskPhone(phone));
    }

    public static void validatePhoneWithFormat(String phone) {
        validatePhone(phone);

        boolean isValidFormat = phone.matches("^\\d{3}-\\d{3}-\\d{4}$") ||
                phone.matches("^\\(\\d{3}\\) \\d{3}-\\d{4}$") ||
                phone.matches("^\\d{10}$") ||
                phone.matches("^\\d{3} \\d{3} \\d{4}$") ||
                phone.matches("^\\+\\d{1,3}[-.\\s]?\\d{3}[-.\\s]?\\d{3}[-.\\s]?\\d{4}$");

        if (!isValidFormat) {
            log.info("Phone format validation failed: Invalid format - {}", maskPhone(phone));
            throw new IllegalArgumentException("Invalid phone number format. Use: XXX-XXX-XXXX, (XXX) XXX-XXXX, or XXXXXXXXXX");
        }

        log.info("Phone format validation passed for: {}", maskPhone(phone));
    }

    public static void validateAge(Integer age) {
        if (age == null) {
            log.info("Age validation failed: Age is null");
            throw new IllegalArgumentException("Age is required");
        }

        if (age < 18 || age > 120) {
            log.info("Age validation failed: Age {} is outside valid range", age);
            throw new IllegalArgumentException("Age must be between 18 and 120");
        }

        log.info("Age validation passed: {}", age);
    }

    public static void validateNewUser(users user) {
         if (user == null) {
             log.info("User validation failed: User object is null");
             throw new IllegalArgumentException("User cannot be null");
         }

         if (!StringUtils.hasText(user.getFullName())) {
             log.info("User validation failed: Full name is empty");
             throw new IllegalArgumentException("Full name is required");
         }

         if (user.getFullName().length() < 2 || user.getFullName().length() > 100) {
             log.info("User validation failed: Full name length invalid - {}", user.getFullName().length());
             throw new IllegalArgumentException("Full name must be between 2 and 100 characters");
         }

         if (!StringUtils.hasText(user.getEmail())) {
             log.info("User validation failed: Email is empty");
             throw new IllegalArgumentException("Email is required");
         }
         validationEmail(user.getEmail());

         if (!StringUtils.hasText(user.getPasswordHash())) {
             log.info("User validation failed: Password is empty");
             throw new IllegalArgumentException("Password is required");
         }
         validationUserPw(user.getPasswordHash(), user.getFullName());

         if (!StringUtils.hasText(user.getPhone())) {
             log.info("User validation failed: Phone is empty");
             throw new IllegalArgumentException("Phone number is required");
         }
         validatePhone(user.getPhone());

         if (user.getRole() == null) {
             log.info("User validation: Role not set, will use default");
         }

         log.info("New user validation passed for email: {}", maskEmail(user.getEmail()));
     }

    public static void validateUserUpdate(users existingUser, users updatedUser) {
         if (existingUser == null) {
             throw new IllegalArgumentException("Existing user cannot be null");
         }

         if (updatedUser == null) {
             throw new IllegalArgumentException("Updated user data cannot be null");
         }

         if (StringUtils.hasText(updatedUser.getFullName())) {
             if (updatedUser.getFullName().length() < 2 || updatedUser.getFullName().length() > 100) {
                 throw new IllegalArgumentException("Full name must be between 2 and 100 characters");
             }
         }

         if (StringUtils.hasText(updatedUser.getEmail())) {
             validationEmail(updatedUser.getEmail());
         }

         if (StringUtils.hasText(updatedUser.getPhone())) {
             validatePhone(updatedUser.getPhone());
         }

         if (StringUtils.hasText(updatedUser.getPasswordHash())) {
             validationUserPw(updatedUser.getPasswordHash(), existingUser.getFullName());
         }

         log.info("User update validation passed for ID: {}", existingUser.getId());
     }

    public static String maskEmail(String email) {
        if (email == null || !email.contains("@")) return "***";
        int atIndex = email.indexOf('@');
        if (atIndex <= 1) return "***" + email.substring(atIndex);
        return email.substring(0, 3) + "***" + email.substring(atIndex);
    }

    public static String maskPhone(String phone) {
        if (phone == null) return "***";
        String digitsOnly = phone.replaceAll("[^0-9]", "");
        if (digitsOnly.length() < 4) return "***";
        return "***" + digitsOnly.substring(digitsOnly.length() - 4);
    }

    public static users sanitizeUser(users user) {
         if (user == null) return null;

         users sanitized = new users();
         sanitized.setId(user.getId());
         sanitized.setFullName(user.getFullName());
         sanitized.setEmail(user.getEmail());
         sanitized.setPhone(maskPhone(user.getPhone()));
         sanitized.setRole(user.getRole());
         sanitized.setCreatedDate(user.getCreatedDate());
         sanitized.setUpdatedDate(user.getUpdatedDate());
         return sanitized;
     }

    public static void validateEmails(List<String> emails) {
        if (emails == null || emails.isEmpty()) {
            throw new IllegalArgumentException("Email list cannot be empty");
        }

        for (String email : emails) {
            validationEmail(email);
        }

        log.info("Batch email validation passed for {} emails", emails.size());
    }
}