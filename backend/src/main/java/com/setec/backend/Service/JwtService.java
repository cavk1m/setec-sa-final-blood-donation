package com.setec.backend.Service;

import com.setec.backend.Model.users;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class JwtService {
    
    private static final Logger log = LoggerFactory.getLogger(JwtService.class);
    
    @Value("${jwt.secret:mySecretKey}")
    private String secret;
    
    @Value("${jwt.expiration:86400000}")
    private Long jwtExpiration; // 24 hours in milliseconds
    
    private final PermissionService permissionService;
    
    public JwtService(PermissionService permissionService) {
        this.permissionService = permissionService;
    }
    
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }
    
    /**
     * Extract username from token
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    
    /**
     * Extract user ID from token
     */
    public UUID extractUserId(String token) {
        String userIdStr = extractClaim(token, claims -> claims.get("userId", String.class));
        return UUID.fromString(userIdStr);
    }
    
    /**
     * Extract user role from token
     */
    public String extractUserRole(String token) {
        return extractClaim(token, claims -> claims.get("role", String.class));
    }
    
    /**
     * Extract user permissions from token
     */
    public List<String> extractPermissions(String token) {
        return extractClaim(token, claims -> {
            @SuppressWarnings("unchecked")
            List<String> permissions = (List<String>) claims.get("permissions");
            return permissions != null ? permissions : new ArrayList<>();
        });
    }
    
    /**
     * Extract expiration date from token
     */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    
    /**
     * Extract specific claim from token
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    
    /**
     * Extract all claims from token
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    
    /**
     * Check if token is expired
     */
    public Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    
    /**
     * Generate token for user with permissions and roles
     */
    public String generateToken(users user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getId().toString());
        claims.put("role", user.getRole().toString());
        claims.put("fullName", user.getFullName());
        claims.put("email", user.getEmail());
        
        // Add permissions to token
        List<String> permissions = permissionService.getUserPermissions(user.getId())
                .stream()
                .map(permission -> permission.getPermissionType().name())
                .collect(Collectors.toList());
        claims.put("permissions", permissions);
        
        // Add user roles to token
        if (user.getUserRoles() != null) {
            List<String> roles = user.getUserRoles().stream()
                    .map(userRole -> userRole.getRole().getRoleType().name())
                    .collect(Collectors.toList());
            claims.put("userRoles", roles);
        }
        
        return generateToken(claims, user.getEmail());
    }
    
    /**
     * Generate token with extra claims
     */
    public String generateToken(Map<String, Object> extraClaims, String username) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    
    /**
     * Validate token against user details
     */
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
    
    /**
     * Validate token against user
     */
    public Boolean validateToken(String token, users user) {
        final String username = extractUsername(token);
        final UUID userId = extractUserId(token);
        return (username.equals(user.getEmail()) && 
                userId.equals(user.getId()) && 
                !isTokenExpired(token));
    }
    
    /**
     * Get remaining time in milliseconds
     */
    public long getTokenRemainingTime(String token) {
        Date expiration = extractExpiration(token);
        return expiration.getTime() - System.currentTimeMillis();
    }
    
    /**
     * Check if token needs refresh (less than 1 hour remaining)
     */
    public boolean needsRefresh(String token) {
        long remainingTime = getTokenRemainingTime(token);
        return remainingTime < 3600000; // 1 hour in milliseconds
    }
    
    /**
     * Refresh token for user
     */
    public String refreshToken(String token, users user) {
        if (validateToken(token, user)) {
            return generateToken(user);
        }
        throw new RuntimeException("Invalid token for refresh");
    }
}