package dev.canverse.finance.api.features.purchase.entities;

import dev.canverse.finance.api.features.currency.entities.Currency;
import dev.canverse.finance.api.features.party.entities.Party;
import dev.canverse.finance.api.features.shared.embeddable.Timestamp;
import dev.canverse.finance.api.features.user.entities.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.util.Assert;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "deliveries")
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Party sender;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Purchase purchase;

    private String description;

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

    @Positive
    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private LocalDate deliveryDate;

    @Setter(AccessLevel.NONE)
    private Timestamp timestamp;

    @CreatedBy
    @Setter(AccessLevel.NONE)
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private User createdBy;

    @LastModifiedBy
    @Setter(AccessLevel.NONE)
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private User updatedBy;

    @OneToMany(mappedBy = "delivery", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<DeliveryItem> deliveryItems = new HashSet<>();

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
