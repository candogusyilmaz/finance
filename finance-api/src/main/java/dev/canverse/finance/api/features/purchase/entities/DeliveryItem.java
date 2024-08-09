package dev.canverse.finance.api.features.purchase.entities;

import dev.canverse.finance.api.features.shared.embeddable.Timestamp;
import dev.canverse.finance.api.features.user.entities.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@Entity
@Table(name = "delivery_items")
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class DeliveryItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Delivery delivery;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private PurchaseItem purchaseItem;

    @Column(nullable = false)
    @Positive
    private int quantity;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;

    private String description;

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

    public enum Status {
        DELIVERED,
        RETURNED
    }
}
