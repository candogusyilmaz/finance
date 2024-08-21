package dev.canverse.finance.api.features.payment.entities;

import dev.canverse.finance.api.features.party.entities.Party;
import dev.canverse.finance.api.features.shared.embeddable.Money;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "payments")
@NoArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private PaymentMethod method;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Party fromParty;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Party toParty;

    @ManyToOne
    private PaymentCategory category;

    private String description;

    private Money money;

    @Column(nullable = false)
    private LocalDate date;

    @Setter(AccessLevel.NONE)
    @OneToMany(mappedBy = "payment", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PaymentAction> actions = new HashSet<>();

    public Payment(Money money, LocalDate date, Status status) {
        this.money = money;
        this.date = date;
        this.actions.add(new PaymentAction(this, status));
    }

    public enum Status {
        PENDING,
        COMPLETED,
        CANCELLED
    }
}
