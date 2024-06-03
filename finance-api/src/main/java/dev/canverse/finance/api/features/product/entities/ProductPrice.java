package dev.canverse.finance.api.features.product.entities;

import dev.canverse.finance.api.features.company.entities.Company;
import dev.canverse.finance.api.features.shared.embeddable.Timeperiod;
import dev.canverse.finance.api.features.shared.embeddable.Timestamp;
import dev.canverse.finance.api.features.user.entities.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "product_prices")
@NoArgsConstructor
public class ProductPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Company subcontractor;

    @ManyToOne(optional = false)
    private Product product;

    @Column(nullable = false)
    private double price;

    @ManyToOne
    private User priceConfirmedBy;

    @Column(nullable = false)
    private String currency;

    private Double vatRate;

    private Double withholdingTaxRate;

    private Timeperiod timeperiod;

    private Timestamp timestamp;

    @Column(nullable = false)
    private boolean active = true;

    @ManyToOne
    private User createdBy;
}
