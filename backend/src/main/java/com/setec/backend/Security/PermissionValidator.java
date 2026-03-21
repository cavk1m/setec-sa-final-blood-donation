package com.setec.backend.Security;

import com.setec.backend.Enum.PermissionType;
import com.setec.backend.Model.users;
import com.setec.backend.Repository.UserRepository;
import com.setec.backend.Service.PermissionService;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Aspect
@Component
@Slf4j
public class PermissionValidator {

    private final UserRepository userRepository;
    private final PermissionService permissionService;

    public PermissionValidator(UserRepository userRepository, PermissionService permissionService) {
        this.userRepository = userRepository;
        this.permissionService = permissionService;
    }

    @Around("@annotation(requirePermission)")
    public Object validatePermission(ProceedingJoinPoint joinPoint, RequirePermission requirePermission) throws Throwable {
        String permissionName = requirePermission.value();
        log.debug("Validating permission: {}", permissionName);

        // Get the current authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            log.warn("Access denied: User not authenticated");
            throw new SecurityException("User is not authenticated");
        }

        // Get user from context
        String email = authentication.getName();
        Optional<users> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            log.warn("Access denied: User not found for email: {}", email);
            throw new SecurityException("User not found");
        }

        users user = userOptional.get();

        // Check if user has the required permission through their role
        try {
            PermissionType requiredPermission = PermissionType.valueOf(permissionName);
            boolean hasPermission = permissionService.userHasPermission(user.getId(), requiredPermission);

            if (!hasPermission) {
                log.warn("Access denied: User {} does not have permission: {}", email, requiredPermission);
                throw new SecurityException("User does not have required permission: " + requiredPermission);
            }
        } catch (IllegalArgumentException e) {
            log.error("Invalid permission name: {}", permissionName);
            throw new SecurityException("Invalid permission: " + permissionName);
        }

        log.debug("Permission granted for user: {} - permission: {}", email, permissionName);
        return joinPoint.proceed();
    }
}
