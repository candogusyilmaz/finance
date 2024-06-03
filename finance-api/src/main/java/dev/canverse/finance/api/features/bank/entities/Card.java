package dev.canverse.finance.api.features.bank.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "cards")
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Bank bank;

    @Column(nullable = false)
    private String name;

    private String cardNumber;

    @Setter(AccessLevel.NONE)
    protected CardType cardType;
}
