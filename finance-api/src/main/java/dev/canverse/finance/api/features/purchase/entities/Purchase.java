package dev.canverse.finance.api.features.purchase.entities;

import dev.canverse.finance.api.features.currency.entities.Currency;
import dev.canverse.finance.api.features.party.entities.Party;
import dev.canverse.finance.api.features.worksite.entities.Worksite;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;
import org.springframework.util.Assert;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "purchases")
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Worksite worksite;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Party supplier;

    @Column(nullable = false)
    @Setter(AccessLevel.NONE)
    private String baseCurrencyCode;

    @Column(nullable = false)
    @Setter(AccessLevel.NONE)
    private Double baseCurrencyRate;

    @Column(nullable = false)
    @Setter(AccessLevel.NONE)
    private String currencyCode;

    @Column(nullable = false)
    @Setter(AccessLevel.NONE)
    private Double currencyRate;

    private String description;

    @Column(nullable = false)
    private boolean official;

    @Column(nullable = false)
    private LocalDateTime purchaseDate;

    @OneToMany(mappedBy = "purchase", cascade = CascadeType.ALL, orphanRemoval = true)
    @Size(min = 1)
    private Set<PurchaseItem> purchaseItems = new HashSet<>();

    @OneToMany(mappedBy = "purchase", cascade = CascadeType.ALL, orphanRemoval = true)
    @Setter(AccessLevel.NONE)
    private Set<PurchaseAction> actions = new HashSet<>();

    public BigDecimal getTotalPurchasePrice() {
        Assert.isTrue(Hibernate.isInitialized(purchaseItems), "Purchase items must be initialized");

        return purchaseItems.stream()
                .map(PurchaseItem::getTotalItemsPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public void setCurrency(Currency currency) {
        Assert.isTrue(Hibernate.isInitialized(currency), "Currency must be initialized");
        this.currencyCode = currency.getCode();
        this.currencyRate = currency.getExchangeRate();
    }

    public void setBaseCurrency(Currency currency) {
        Assert.isTrue(Hibernate.isInitialized(currency), "Currency must be initialized");
        this.baseCurrencyCode = currency.getCode();
        this.baseCurrencyRate = currency.getExchangeRate();
    }
}
