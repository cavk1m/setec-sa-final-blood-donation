package com.setec.backend.Security;

import com.setec.backend.Enum.RoleType;
import com.setec.backend.Model.UserRole;
import com.setec.backend.Model.users;
import com.setec.backend.Repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.Set;

@Aspect
@Component
@Slf4j
public class RoleValidator {

    private final UserRepository userRepository;

    public RoleValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Around("@annotation(requireRole)")
    public Object validateRole(ProceedingJoinPoint joinPoint, RequireRole requireRole) throws Throwable {
        log.debug("Validating role: {}", requireRole.role());

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
        RoleType[] requiredRoles = requireRole.role();
        
        // Check if user has any of the required roles
        boolean hasRole = false;
        if (user.getUserRoles() != null) {
            for (UserRole userRole : user.getUserRoles()) {
                for (RoleType requiredRole : requiredRoles) {
                    if (userRole.getRole().getRoleType() == requiredRole) {
                        hasRole = true;
                        break;
                    }
                }
                if (hasRole) break;
            }
        }

        if (!hasRole) {
            log.warn("Access denied: User {} does not have required role", email);
            throw new SecurityException("User does not have required role");
        }

        log.debug("Role validation passed for user: {}", email);
        return joinPoint.proceed();
    }
}
