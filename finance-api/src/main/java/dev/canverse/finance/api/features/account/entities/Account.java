package dev.canverse.finance.api.features.account.entities;

import dev.canverse.finance.api.features.currency.entities.Currency;
import dev.canverse.finance.api.features.shared.embeddable.Timestamp;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "accounts")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private BigDecimal balance;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Currency currency;

    @Setter(AccessLevel.NONE)
    private Timestamp timestamp;

    public Account(BigDecimal balance, Currency currency) {
        this.balance = balance;
        this.currency = currency;
    }
}
