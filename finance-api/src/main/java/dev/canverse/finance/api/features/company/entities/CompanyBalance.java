package dev.canverse.finance.api.features.company.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "company_balances")
@NoArgsConstructor
public class CompanyBalance {
    @Id
    @Column(name = "company_id")
    private Long id;

    @OneToOne(optional = false)
    @MapsId
    private Company company;

    @Column(nullable = false)
    @Setter(AccessLevel.NONE)
    private double totalOfficialPurchaseAmount = 0;

    @Column(nullable = false)
    @Setter(AccessLevel.NONE)
    private double totalOfficialReceivedAmount = 0;

    @Column(nullable = false)
    @Setter(AccessLevel.NONE)
    private double totalOfficialGivenAmount = 0;

    @Column(nullable = false)
    @Setter(AccessLevel.NONE)
    private double totalUnofficialPurchaseAmount = 0;

    @Column(nullable = false)
    @Setter(AccessLevel.NONE)
    private double totalUnofficialReceivedAmount = 0;

    @Column(nullable = false)
    @Setter(AccessLevel.NONE)
    private double totalUnofficialGivenAmount = 0;

    @UpdateTimestamp
    @Setter(AccessLevel.NONE)
    private LocalDateTime updatedAt;
}
