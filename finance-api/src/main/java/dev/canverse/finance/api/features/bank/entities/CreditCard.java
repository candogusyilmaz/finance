package dev.canverse.finance.api.features.bank.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "credit_cards")
public class CreditCard extends Card {

    private Double minimumPayment;

    private LocalDateTime dueDate;

    private LocalDateTime statementDate;

    private double limit;

    @Column(nullable = false)
    private double expense;

    public CreditCard() {
        this.cardType = CardType.CREDIT;
    }
}
