package com.setec.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MoneyDonationResponse {
    @JsonProperty("id")
    private UUID id;

    @JsonProperty("user_id")
    private long userId;

    @JsonProperty("campaign_id")
    private String campaignId;

    @JsonProperty("amount")
    private BigDecimal amount;

    @JsonProperty("currency")
    private String currency;

    @JsonProperty("payment_method")
    private String paymentMethod;

    @JsonProperty("transaction_id")
    private String transactionId;

    @JsonProperty("payway_tran_id")
    private String paywayTranId;

    @JsonProperty("status")
    private String status;

    @JsonProperty("paid_at")
    private LocalDateTime paidAt;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;
}
