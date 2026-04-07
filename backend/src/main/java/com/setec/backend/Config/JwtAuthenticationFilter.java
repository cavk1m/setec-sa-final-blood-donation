package com.setec.backend.Config;

import com.setec.backend.Service.JwtService;
import com.setec.backend.Service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    private static final Logger log = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    
    private final JwtService jwtService;
    private final UserService userService;
//    @Bean
//    public AuthenticationManager authenticationManager(
//            AuthenticationConfiguration config) throws Exception {
//        return config.getAuthenticationManager();
//    }
    @Autowired
    public JwtAuthenticationFilter(JwtService jwtService, UserService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        
        // Skip JWT validation for certain endpoints
        String requestPath = request.getServletPath();
        if (isPublicEndpoint(requestPath)) {
            filterChain.doFilter(request, response);
            return;
        }
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        
        jwt = authHeader.substring(7);
        
        try {
            userEmail = jwtService.extractUsername(jwt);
            
            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                var user = userService.getUserByEmail(userEmail);
                
                if (user != null && jwtService.validateToken(jwt, user)) {
                     // Create UserDetails-like object for Spring Security
                     UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                             .username(user.getEmail())
                             .password(user.getPasswordHash() != null ? user.getPasswordHash() : "")
                             .authorities(new ArrayList<>()) // You can add roles here if needed
                             .accountExpired(false)
                             .accountLocked(!user.getIsActive())
                             .credentialsExpired(false)
                             .disabled(!user.getIsActive())
                             .build();
                    
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    
                    // Add user info to request attributes for easy access in controllers
                    request.setAttribute("currentUserId", user.getId());
                    request.setAttribute("currentUserEmail", user.getEmail());
                    request.setAttribute("currentUserRole", user.getRole());
                }
            }
        } catch (Exception e) {
            log.error("JWT Authentication failed: {}", e.getMessage());
            // Clear security context on error
            SecurityContextHolder.clearContext();
        }
        
        filterChain.doFilter(request, response);
    }
    
    private boolean isPublicEndpoint(String path) {
        return path.startsWith("/api/users/register") ||
               path.startsWith("/api/users/verify-otp") ||
               path.startsWith("/api/users/login") ||
               path.startsWith("/api/users/forgot-password") ||
               path.startsWith("/api/users/reset-password") ||
               path.startsWith("/api/greeting") ||
               path.startsWith("/uploads/") ||
               path.startsWith("/actuator/") ||
               path.equals("/") ||
               path.startsWith("/swagger") ||
               path.startsWith("/v3/api-docs");
    }

}