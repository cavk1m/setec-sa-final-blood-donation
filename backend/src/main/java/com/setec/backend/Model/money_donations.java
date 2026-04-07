package com.setec.backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "money_donations", indexes = {
    @Index(name = "idx_money_donations_user_id", columnList = "user_id"),
    @Index(name = "idx_money_donations_campaign_id", columnList = "campaign_id"),
    @Index(name = "idx_money_donations_status", columnList = "status"),
    @Index(name = "idx_money_donations_created_at", columnList = "created_at"),
    @Index(name = "idx_money_donations_paid_at", columnList = "paid_at")
})
public class money_donations {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", columnDefinition = "VARCHAR(255)")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private users user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id")
    private campaigns campaign;

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;
    
    @Column(name = "currency", nullable = false)
    private String currency = "USD";
    
    @Column(name = "payment_method")
    private String paymentMethod;
    
    @Column(name = "transaction_id")
    private String transactionId;
    
    @Column(name = "payway_tran_id")
    private String paywayTranId;
    
    @Column(name = "status", nullable = false)
    private String status = "pending";

    @Column(name = "paid_at")
    private LocalDateTime paidAt;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    

    @OneToMany(mappedBy = "moneyDonation", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<payway_transactions> paywayTransactions;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
