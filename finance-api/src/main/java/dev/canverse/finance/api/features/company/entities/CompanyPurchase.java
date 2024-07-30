package dev.canverse.finance.api.features.company.entities;

import dev.canverse.finance.api.features.purchase.entities.Purchase;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "company_purchases")
@NoArgsConstructor
public class CompanyPurchase extends Purchase {
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Company company;
}
