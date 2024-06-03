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
@Table(name = "debit_cards")
public class DebitCard extends Card {
    private LocalDateTime expiryDate;

    @Column(nullable = false)
    private double balance = 0;

    public DebitCard() {
        this.cardType = CardType.DEBIT;
    }
}
