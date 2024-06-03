package dev.canverse.finance.api.features.transaction.entities;

import jakarta.persistence.*;
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
@Table(name = "transactions")
@NoArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private TransactionCategory category;

    @Column(nullable = false)
    private TransactionType type;

    @ManyToOne
    private TransactionMethod method;

    private String iban;

    private String description;

    @Column(nullable = false)
    private double amount;

    @Column(nullable = false)
    private String currency;

    @Column(nullable = false)
    private boolean official;

    @Column(nullable = false)
    private LocalDateTime date;

    @ManyToOne
    @JoinFormula("(SELECT pa.id FROM payment_actions pa WHERE pa.payment_id = id ORDER BY pa.id DESC LIMIT 1)")
    private TransactionAction lastAction;

    @OneToMany(mappedBy = "transaction", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<TransactionAction> actions = new HashSet<>();
}
