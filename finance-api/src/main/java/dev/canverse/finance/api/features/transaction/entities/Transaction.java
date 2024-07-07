package dev.canverse.finance.api.features.transaction.entities;

import dev.canverse.finance.api.features.currency.entities.Currency;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JoinFormula;

import java.math.BigDecimal;
import java.time.LocalDate;
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

    @ManyToOne
    private TransactionMethod method;

    private String description;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @ManyToOne(optional = false)
    private Currency currency;

    @Column(nullable = false)
    private LocalDate date;

    @ManyToOne
    @JoinFormula("(SELECT pa.id FROM payment_actions pa WHERE pa.payment_id = id ORDER BY pa.id DESC LIMIT 1)")
    @Setter(AccessLevel.NONE)
    private TransactionAction lastAction;

    @OneToMany(mappedBy = "transaction", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<TransactionAction> actions = new HashSet<>();

    public static Transaction create(BigDecimal amount, Currency currency, TransactionStatus status) {
        var transaction = new Transaction();

        transaction.setAmount(amount);
        transaction.setCurrency(currency);
        transaction.getActions().add(new TransactionAction(transaction, status));

        return transaction;
    }
}
