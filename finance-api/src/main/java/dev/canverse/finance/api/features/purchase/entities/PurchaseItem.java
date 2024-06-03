package dev.canverse.finance.api.features.purchase.entities;

import dev.canverse.finance.api.features.product.entities.Product;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "purchased_items")
@NoArgsConstructor
public class PurchaseItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Purchase purchase;

    @ManyToOne(optional = false)
    private Product product;

    private String description;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private double unitPrice;

    @Column(nullable = false)
    private String currency;

    private Double vatRate;

    private Double withholdingTaxRate;

    private LocalDateTime arrivalDate;

    @Column(nullable = false)
    private boolean official;
}
