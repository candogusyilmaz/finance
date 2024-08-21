package dev.canverse.finance.api.features.purchase.entities;

import dev.canverse.finance.api.features.product.entities.Product;
import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.util.Assert;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "purchase_items")
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
    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal unitPrice;

    @PositiveOrZero
    @ColumnDefault("0")
    @Column(nullable = false)
    private Double vatRate;

    @PositiveOrZero
    @ColumnDefault("0")
    @Column(nullable = false)
    private Double withholdingTaxRate;

    @Setter(AccessLevel.NONE)
    @OneToMany(mappedBy = "purchaseItem", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<DeliveryItem> deliveryItems = new HashSet<>();

    public BigDecimal getTotalItemsPrice() {
        return unitPrice.multiply(BigDecimal.valueOf(quantity));
    }

    public int getDeliveredQuantity() {
        Assert.isTrue(Hibernate.isInitialized(deliveryItems), "Deliveries should be initialized");

        return deliveryItems.stream()
                .filter(delivery -> DeliveryItem.Status.DELIVERED.equals(delivery.getStatus()))
                .mapToInt(DeliveryItem::getQuantity)
                .sum();
    }

    public int getReturnedQuantity() {
        Assert.isTrue(Hibernate.isInitialized(deliveryItems), "Deliveries should be initialized");

        return deliveryItems.stream()
                .filter(delivery -> DeliveryItem.Status.RETURNED.equals(delivery.getStatus()))
                .mapToInt(DeliveryItem::getQuantity)
                .sum();
    }

    public int getDeliveredAndReturnedQuantity() {
        return deliveryItems.stream()
                .mapToInt(DeliveryItem::getQuantity)
                .sum();
    }

    public int getRemainingQuantity() {
        return quantity - getDeliveredQuantity() - getReturnedQuantity();
    }
}
