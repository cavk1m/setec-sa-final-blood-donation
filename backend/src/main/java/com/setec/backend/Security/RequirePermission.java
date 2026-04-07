package com.setec.backend.Security;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotation to enforce permission-based access control on methods.
 * Usage: @RequirePermission("PERMISSION_NAME")
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RequirePermission {
    /**
     * The required permission type as a string (e.g., "USER_CREATE", "ADMIN_LIST")
     */
    String value();
}
