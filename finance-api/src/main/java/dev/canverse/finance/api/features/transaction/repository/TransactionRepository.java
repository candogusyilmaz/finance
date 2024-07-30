package dev.canverse.finance.api.features.transaction.repository;

import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import dev.canverse.finance.api.features.transaction.entities.Transaction;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends ExtendedJpaRepository<Transaction, Long> {
}