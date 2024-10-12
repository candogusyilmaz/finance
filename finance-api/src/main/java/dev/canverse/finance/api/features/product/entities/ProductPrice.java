package dev.canverse.finance.api.features.product.entities;

import dev.canverse.finance.api.features.currency.entities.Currency;
import dev.canverse.finance.api.features.employee.entities.Employee;
import dev.canverse.finance.api.features.party.entities.Party;
import dev.canverse.finance.api.features.shared.embeddable.DatePeriod;
import dev.canverse.finance.api.features.shared.embeddable.Timestamp;
import dev.canverse.finance.api.features.user.entities.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "product_prices")
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class ProductPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Party supplier;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Product product;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @ManyToOne(fetch = FetchType.LAZY)
    private Employee priceConfirmedBy;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Currency currency;

    @Column(nullable = false)
    private Double vatRate;

    @Column(nullable = false)
    private Double withholdingTaxRate;

    private DatePeriod timeperiod;

    @Setter(lombok.AccessLevel.NONE)
    private Timestamp timestamp;

    @Column(nullable = false)
    private boolean active = true;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @CreatedBy
    private User createdBy;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @LastModifiedBy
    private User updatedBy;
}
