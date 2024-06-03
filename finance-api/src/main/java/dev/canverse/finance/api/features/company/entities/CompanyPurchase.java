package dev.canverse.finance.api.features.company.entities;

import dev.canverse.finance.api.features.company.events.CompanyPurchaseCreatedEvent;
import dev.canverse.finance.api.features.purchase.entities.Purchase;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.AbstractAggregateRoot;

@Getter
@Setter
@Entity
@Table(name = "company_purchases")
@NoArgsConstructor
public class CompanyPurchase extends AbstractAggregateRoot<CompanyPurchase> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Company company;

    @OneToOne(optional = false)
    private Purchase purchase;

    @PrePersist
    public void prePersist() {
        registerEvent(new CompanyPurchaseCreatedEvent(this));
    }
}
