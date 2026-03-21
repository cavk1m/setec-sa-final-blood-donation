package com.setec.backend.Enum;

public enum RoleType {
    SUPER_ADMIN("Super Administrator with full system access"),
    ADMIN("Hospital/Organization Administrator"),
    HOSPITAL("Hospital Staff Member"),
    USER("Regular Donor");

    private final String description;

    RoleType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
