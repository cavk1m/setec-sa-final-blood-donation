package com.setec.backend.Enum;

public enum DonationType {
    BLOOD("Blood"),
    MONEY("Money"),
    BOTH("Both");

    private final String label;

    DonationType(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
