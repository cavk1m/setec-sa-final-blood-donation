package com.setec.backend.Enum;

public enum PaymentOption {
    VISA("Visa"),
    MASTERCARD("Mastercard"),
    MOBILE_MONEY("Mobile Money"),
    ONLINE_BANKING("Online Banking");

    private final String label;

    PaymentOption(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
