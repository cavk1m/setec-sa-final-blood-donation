package com.setec.backend.Security;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotation to enforce role-based access control on methods.
 * Usage: @RequireRole("ROLE_NAME")
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RequireRole {
    /**
     * The required role type as a string (e.g., "SUPER_ADMIN", "ADMIN")
     */
    String value();

    /**
     * Whether all roles in the value array are required (AND) or just one (OR)
     */
    boolean requireAll() default false;
}
