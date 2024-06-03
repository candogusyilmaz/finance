package dev.canverse.finance.api.features.bank.entities;

import dev.canverse.finance.api.features.bank.events.CardTransactionCreatedEvent;
import dev.canverse.finance.api.features.transaction.entities.Transaction;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.AbstractAggregateRoot;

@Getter
@Setter
@Entity
@Table(name = "card_transactions")
@NoArgsConstructor
public class CardTransaction extends AbstractAggregateRoot<CardTransaction> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Card sender;

    @ManyToOne
    private Card receiver;

    @ManyToOne(optional = false)
    private Transaction transaction;

    @PrePersist
    public void prePersist() {
        registerEvent(new CardTransactionCreatedEvent(this));
    }
}
