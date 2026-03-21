package com.setec.backend.Service.Serviceimpl;

import com.setec.backend.Enum.Role;
import com.setec.backend.Model.users;
import com.setec.backend.Repository.UserRepository;
import com.setec.backend.Service.ServiceHandler.UserServiceHandler;
import com.setec.backend.Service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public users createUser(users user) {
        log.info("Attempting to create user with email: {}", maskEmail(user.getEmail()));

        try {
            if (user == null) {
                throw new IllegalArgumentException("User cannot be null");
            }

            if (!StringUtils.hasText(user.getEmail())) {
                throw new IllegalArgumentException("Email is required");
            }
            UserServiceHandler.validationEmail(user.getEmail());

            if (userRepository.existsByEmail(user.getEmail())) {
                log.warn("Email already exists: {}", maskEmail(user.getEmail()));
                throw new IllegalArgumentException("Email already registered");
            }

            validateNewUser(user);

            String encodedPassword = passwordEncoder.encode(user.getPasswordHash());
            user.setPasswordHash(encodedPassword);

            LocalDateTime now = LocalDateTime.now();
            user.setCreatedDate(now);
            user.setUpdatedDate(now);
            user.setRole(Role.USER);

            users savedUser = userRepository.save(user);
            log.info("User created successfully with ID: {}", savedUser.getId());

            return sanitizeUser(savedUser);

        } catch (IllegalArgumentException e) {
            log.error("Validation failed: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Unexpected error during user creation: {}", e.getMessage());
            throw new RuntimeException("Failed to create user: " + e.getMessage(), e);
        }
    }

    private void validateNewUser(users user) {
         if (!StringUtils.hasText(user.getFullName())) {
             throw new IllegalArgumentException("Full name is required");
         }

         if (!StringUtils.hasText(user.getPasswordHash())) {
             throw new IllegalArgumentException("Password is required");
         }
         UserServiceHandler.validationUserPw(user.getPasswordHash(), user.getFullName());

         if (!StringUtils.hasText(user.getPhone())) {
             throw new IllegalArgumentException("Phone number is required");
         }
         UserServiceHandler.validatePhone(user.getPhone());
     }

    @Override
    @Transactional(readOnly = true)
    public users getUserById(UUID id) {
        log.debug("Fetching user by ID: {}", id);

        return userRepository.findById(id)
                .map(this::sanitizeUser)
                .orElseThrow(() -> {
                    log.warn("User not found with ID: {}", id);
                    return new IllegalArgumentException("User not found with ID: " + id);
                });
    }

    @Override
    @Transactional(readOnly = true)
    public users getUserByEmail(String email) {
        log.debug("Fetching user by email: {}", maskEmail(email));

        if (!StringUtils.hasText(email)) {
            throw new IllegalArgumentException("Email cannot be empty");
        }

        UserServiceHandler.validationEmail(email);

        return userRepository.findByEmail(email)
                .map(this::sanitizeUser)
                .orElseThrow(() -> {
                    log.warn("User not found with email: {}", maskEmail(email));
                    return new IllegalArgumentException("User not found with email: " + maskEmail(email));
                });
    }

    @Override
    @Transactional(readOnly = true)
    public List<users> getAllUsers() {
        log.debug("Fetching all users");

        return userRepository.findAll().stream()
                .map(this::sanitizeUser)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public users updateUser(UUID id, users userDetails) {
        log.info("Updating user with ID: {}", id);

        try {
            users existingUser = userRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + id));

            if (StringUtils.hasText(userDetails.getFullName())) {
                 existingUser.setFullName(userDetails.getFullName());
             }

            if (StringUtils.hasText(userDetails.getPhone())) {
                UserServiceHandler.validatePhone(userDetails.getPhone());
                existingUser.setPhone(userDetails.getPhone());
            }

            if (StringUtils.hasText(userDetails.getEmail()) &&
                    !existingUser.getEmail().equals(userDetails.getEmail())) {

                UserServiceHandler.validationEmail(userDetails.getEmail());

                if (userRepository.existsByEmail(userDetails.getEmail())) {
                    throw new IllegalArgumentException("Email already taken by another user");
                }
                existingUser.setEmail(userDetails.getEmail());
            }

            if (StringUtils.hasText(userDetails.getPasswordHash())) {
                 UserServiceHandler.validationUserPw(userDetails.getPasswordHash(), existingUser.getFullName());
                 existingUser.setPasswordHash(passwordEncoder.encode(userDetails.getPasswordHash()));
             }

            if (userDetails.getRole() != null) {
                existingUser.setRole(userDetails.getRole());
            }

            existingUser.setUpdatedDate(LocalDateTime.now());

            users updatedUser = userRepository.save(existingUser);
            log.info("User updated successfully with ID: {}", id);

            return sanitizeUser(updatedUser);

        } catch (Exception e) {
            log.error("Failed to update user with ID {}: {}", id, e.getMessage());
            throw new RuntimeException("Failed to update user: " + e.getMessage(), e);
        }
    }

    @Override
    @Transactional
    public void deleteUser(UUID id) {
        log.info("Deleting user with ID: {}", id);

        if (!userRepository.existsById(id)) {
            log.warn("Cannot delete - user not found with ID: {}", id);
            throw new IllegalArgumentException("User not found with ID: " + id);
        }

        try {
            userRepository.deleteById(id);
            log.info("User deleted successfully with ID: {}", id);
        } catch (Exception e) {
            log.error("Failed to delete user with ID {}: {}", id, e.getMessage());
            throw new RuntimeException("Failed to delete user: " + e.getMessage(), e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        if (!StringUtils.hasText(email)) {
            return false;
        }
        return userRepository.existsByEmail(email);
    }


    private users sanitizeUser(users user) {
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

    private String maskEmail(String email) {
        if (email == null || !email.contains("@")) return "***";
        int atIndex = email.indexOf('@');
        if (atIndex <= 1) return "***" + email.substring(atIndex);
        return email.substring(0, 3) + "***" + email.substring(atIndex);
    }

    private String maskPhone(String phone) {
        if (phone == null) return "***";
        String digitsOnly = phone.replaceAll("[^0-9]", "");
        if (digitsOnly.length() < 4) return "***";
        return "***" + digitsOnly.substring(digitsOnly.length() - 4);
    }
}