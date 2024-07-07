package dev.canverse.finance.api.features.bank.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "credit_cards")
public class CreditCard extends Card {

    private BigDecimal minimumPayment;

    private LocalDateTime dueDate;

    private LocalDateTime statementDate;

    private BigDecimal maxLimit;

    @Column(nullable = false)
    private BigDecimal expense;

    public CreditCard() {
        this.cardType = CardType.CREDIT;
    }
}
