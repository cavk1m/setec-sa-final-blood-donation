package com.setec.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaywayTransactionRequest {
    @JsonProperty("money_donation_id")
    private long moneyDonationId;

    @JsonProperty("tran_id")
    private String tranId;

    @JsonProperty("merchant_id")
    private String merchantId;

    @JsonProperty("amount")
    private BigDecimal amount;

    @JsonProperty("currency")
    private String currency;

    @JsonProperty("payment_option")
    private String paymentOption;

    @JsonProperty("raw_payload")
    private String rawPayload;
}
