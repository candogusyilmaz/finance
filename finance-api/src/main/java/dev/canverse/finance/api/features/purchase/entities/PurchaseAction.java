package dev.canverse.finance.api.features.purchase.entities;

import dev.canverse.finance.api.features.user.entities.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "purchase_actions")
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class PurchaseAction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Purchase purchase;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Purchase.Status status;

    private String comment;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @CreatedBy
    @Setter(AccessLevel.NONE)
    private User createdBy;

    @CreationTimestamp
    @Setter(AccessLevel.NONE)
    private LocalDateTime createdAt;

    public PurchaseAction(Purchase purchase, Purchase.Status status) {
        this.purchase = purchase;
        this.status = status;
    }
}
