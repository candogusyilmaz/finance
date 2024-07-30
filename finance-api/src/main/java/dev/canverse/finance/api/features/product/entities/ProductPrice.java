package dev.canverse.finance.api.features.product.entities;

import dev.canverse.finance.api.features.company.entities.Company;
import dev.canverse.finance.api.features.currency.entities.Currency;
import dev.canverse.finance.api.features.employment.entities.Employee;
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

    @ManyToOne
    private Company subcontractor;

    @ManyToOne(optional = false)
    private Product product;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @ManyToOne
    private Employee priceConfirmedBy;

    @ManyToOne(optional = false)
    private Currency currency;

    private Double vatRate;

    private Double withholdingTaxRate;

    private DatePeriod timeperiod;

    @Setter(lombok.AccessLevel.NONE)
    private Timestamp timestamp;

    @Column(nullable = false)
    private boolean active = true;

    @ManyToOne(optional = false)
    @CreatedBy
    private User createdBy;

    @ManyToOne(optional = false)
    @LastModifiedBy
    private User updatedBy;
}
