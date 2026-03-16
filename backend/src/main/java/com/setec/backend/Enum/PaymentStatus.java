package com.setec.backend.Enum;

public enum PaymentStatus {
    PENDING("Pending"),
    COMPLETED("Completed"),
    FAILED("Failed"),
    CANCELLED("Cancelled"),
    REFUNDED("Refunded");

    private final String label;

    PaymentStatus(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
