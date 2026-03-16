package com.setec.backend.Enum;

public enum Currency {
    USD("USD"),
    EUR("EUR"),
    GBP("GBP"),
    KHR("KHR"),
    THB("THB"),
    VND("VND");

    private final String label;

    Currency(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
