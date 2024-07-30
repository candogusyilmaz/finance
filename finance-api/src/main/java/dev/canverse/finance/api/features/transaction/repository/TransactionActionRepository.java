package dev.canverse.finance.api.features.transaction.repository;

import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import dev.canverse.finance.api.features.transaction.entities.TransactionAction;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionActionRepository extends ExtendedJpaRepository<TransactionAction, Long> {
}