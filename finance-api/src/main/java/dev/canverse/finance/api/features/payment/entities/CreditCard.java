package dev.canverse.finance.api.features.payment.entities;

import dev.canverse.finance.api.features.party.entities.Party;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "credit_cards")
public class CreditCard extends PaymentMethod {
    @ManyToOne(fetch = FetchType.LAZY)
    private Party cardHolder;

    private String cardNumber;

    private LocalDate expirationDate;

    @Column(length = 3)
    private String cvv;
}
