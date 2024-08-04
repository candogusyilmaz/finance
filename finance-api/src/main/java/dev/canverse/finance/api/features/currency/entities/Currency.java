package dev.canverse.finance.api.features.currency.entities;

import dev.canverse.finance.api.features.shared.embeddable.Timestamp;
import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "currencies")
@NoArgsConstructor
public class Currency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 3)
    private String code;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false, unique = true)
    private String symbol;

    @Column(nullable = false)
    @Positive
    private double exchangeRate;

    @Column(nullable = false)
    private boolean baseCurrency;

    @Column(nullable = false)
    private boolean invoiceCurrency;

    @Setter(lombok.AccessLevel.NONE)
    private Timestamp timestamp;
}
