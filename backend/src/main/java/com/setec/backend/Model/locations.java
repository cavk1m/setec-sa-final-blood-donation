package com.setec.backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "locations")
public class locations {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", columnDefinition = "VARCHAR(255)")
    private UUID id;
    private String name;
    private String address;
    private String latitude;
    private String longitude;
    private String donation_type;
    private String payment_qr_url;

}
