package dev.canverse.finance.api.features.purchase.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JoinFormula;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "purchases")
@NoArgsConstructor
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    @Column(nullable = false)
    @Setter(AccessLevel.NONE)
    private double totalPrice;

    @Column(nullable = false)
    private LocalDateTime purchaseDate;

    @OneToMany(mappedBy = "purchase", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PurchaseItem> purchasedItems;

    @ManyToOne
    @JoinFormula("(SELECT pa.id FROM purchase_actions pa WHERE pa.purchase_id = id ORDER BY pa.id DESC LIMIT 1)")
    private PurchaseAction lastAction;

    @OneToMany(mappedBy = "purchase", cascade = CascadeType.ALL, orphanRemoval = true)
    @Setter(AccessLevel.NONE)
    private Set<PurchaseAction> actions;

    public void addAction(PurchaseAction action) {
        if (actions == null) {
            actions = new HashSet<>();
        }

        actions.add(action);
        lastAction = action;
    }

    public void setPurchasedItems(Set<PurchaseItem> purchasedItems) {
        this.purchasedItems = purchasedItems;
        this.purchasedItems.forEach(purchaseItem -> totalPrice += purchaseItem.getUnitPrice() * purchaseItem.getQuantity());
    }
}
