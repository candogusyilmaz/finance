package dev.canverse.finance.api.features.account.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "debit_cards")
@NoArgsConstructor
public class DebitCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Account account;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Bank bank;

    @Column(nullable = false)
    private String name;

    private String cardNumber;

    private LocalDate expiryDate;
}
