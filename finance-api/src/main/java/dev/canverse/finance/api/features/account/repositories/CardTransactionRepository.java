package dev.canverse.finance.api.features.account.repositories;

import dev.canverse.finance.api.features.account.entities.CardTransaction;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardTransactionRepository extends ExtendedJpaRepository<CardTransaction, Long> {
}