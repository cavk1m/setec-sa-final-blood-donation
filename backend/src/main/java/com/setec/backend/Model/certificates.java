package com.setec.backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;
import java.util.UUID;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "certificates")
public class certificates {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", columnDefinition = "VARCHAR(255)")
    private UUID id;
    private long user_id;
    private long donation_id;
    private String certificate_number;
    private Date issued_date;
    private String location_name;
    private String pdf_url;
    private Date created_at;

}
