package dev.canverse.finance.api.features.bank.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "credit_cards")
@NoArgsConstructor
public class CreditCard {
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

    private LocalDate dueDate;

    private LocalDate statementDate;

    private BigDecimal minimumPayment;

    private BigDecimal maxLimit;
}
