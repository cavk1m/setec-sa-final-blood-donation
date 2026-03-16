package com.setec.backend.Enum;

public enum QueueStatus {
    PENDING("Pending"),
    IN_PROGRESS("In Progress"),
    COMPLETED("Completed"),
    CANCELLED("Cancelled"),
    NO_SHOW("No Show");

    private final String label;

    QueueStatus(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
