package com.setec.backend.Model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@MappedSuperclass
@AllArgsConstructor
@NoArgsConstructor
@Data
public abstract class BaseEntity  {
    @Id
    @Column(name = "objectId", insertable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long objectId;

    @Column(name = "createdDate", updatable = false, columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @CreationTimestamp
    private Date createdDate;

    @Column(name = "updatedDate", columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @UpdateTimestamp
    private Date updatedDate;

    @Column(name = "Create_by")
    private String Create_by;

}
