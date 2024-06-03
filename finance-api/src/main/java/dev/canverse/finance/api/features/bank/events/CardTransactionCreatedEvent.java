package dev.canverse.finance.api.features.bank.events;

import dev.canverse.finance.api.features.bank.entities.CardTransaction;

public record CardTransactionCreatedEvent(CardTransaction cardTransaction) {
}
