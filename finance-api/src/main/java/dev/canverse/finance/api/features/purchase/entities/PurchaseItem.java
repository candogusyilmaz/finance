package dev.canverse.finance.api.features.purchase.entities;

import dev.canverse.finance.api.features.product.entities.Product;
import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "purchased_items")
@NoArgsConstructor
public class PurchaseItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Purchase purchase;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Product product;

    private String description;

    @Positive
    @Column(nullable = false)
    private int quantity;

    @PositiveOrZero
    @Column(nullable = false)
    private BigDecimal unitPrice;

    @PositiveOrZero
    @ColumnDefault("0")
    @Column(nullable = false)
    private Double vatRate;

    @PositiveOrZero
    @ColumnDefault("0")
    @Column(nullable = false)
    private Double withholdingTaxRate;

    @Column(nullable = false)
    private boolean official;

    public BigDecimal getTotalItemsPrice() {
        return unitPrice.multiply(BigDecimal.valueOf(quantity));
    }
}
