package com.setec.backend.Model;

import com.setec.backend.Enum.Currency;
import com.setec.backend.Enum.PaymentOption;
import com.setec.backend.Enum.PaymentStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "payway_transactions", indexes = {
    @Index(name = "idx_payway_transactions_tran_id", columnList = "tran_id", unique = true),
    @Index(name = "idx_payway_transactions_merchant_id", columnList = "merchant_id"),
    @Index(name = "idx_payway_transactions_status", columnList = "status"),
    @Index(name = "idx_payway_transactions_money_donation_id", columnList = "money_donation_id"),
    @Index(name = "idx_payway_transactions_received_at", columnList = "received_at")
})
public class payway_transactions {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", columnDefinition = "VARCHAR(255)")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "money_donation_id")
    private money_donations moneyDonation;

    @Column(name = "tran_id", unique = true, nullable = false)
    private String tranId;
    
    @Column(name = "merchant_id", nullable = false)
    private String merchantId;
    
    @Column(name = "amount", nullable = false)
    private BigDecimal amount;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "currency", nullable = false)
    private Currency currency;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private PaymentStatus status;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_option", nullable = false)
    private PaymentOption paymentOption;

    @Column(name = "raw_payload", columnDefinition = "jsonb")
    private String rawPayload;

    @Column(name = "received_at", nullable = false)
    private LocalDateTime receivedAt;
    
    @PrePersist
    protected void onCreate() {
        receivedAt = LocalDateTime.now();
    }
}
