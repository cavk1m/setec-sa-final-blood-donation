package com.setec.backend.Model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "payway_transactions")
public class payway_transactions {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", columnDefinition = "VARCHAR(255)")
    private UUID id;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "money_donation_id")
    private long  moneyDonation;

    private String tranId;
    private String merchantId;
    private BigDecimal amount;
    private String currency;
    private String status;
    private String paymentOption;

    @Column(columnDefinition = "jsonb")
    private String rawPayload;

    private LocalDateTime receivedAt;
}
