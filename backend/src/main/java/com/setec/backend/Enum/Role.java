package com.setec.backend.Enum;

public enum Role {
    ADMIN("Admin"),
    DONOR("Donor"),
    RECIPIENT("Recipient"),
    STAFF("Staff"),
    USER("User");

    private final String label;

    Role(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
