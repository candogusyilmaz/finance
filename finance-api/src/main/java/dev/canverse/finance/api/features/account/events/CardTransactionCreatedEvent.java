package dev.canverse.finance.api.features.account.events;

import dev.canverse.finance.api.features.account.entities.CardTransaction;

public record CardTransactionCreatedEvent(CardTransaction cardTransaction) {
}
