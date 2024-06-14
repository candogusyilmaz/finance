package dev.canverse.finance.api.features.company.entities;

import dev.canverse.finance.api.features.shared.embeddable.Timestamp;
import dev.canverse.finance.api.features.user.entities.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SoftDelete;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@Entity
@Table(name = "companies")
@NoArgsConstructor
@SoftDelete
@EntityListeners(AuditingEntityListener.class)
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String address;

    private String taxOffice;

    private String taxRegistrationNumber;

    private String phoneNumber;

    private String email;

    private Timestamp timestamp;

    @ManyToOne(optional = false)
    @CreatedBy
    @Setter(AccessLevel.NONE)
    private User createdBy;

    @ManyToOne(optional = false)
    @LastModifiedBy
    @Setter(AccessLevel.NONE)
    private User updatedBy;
}
