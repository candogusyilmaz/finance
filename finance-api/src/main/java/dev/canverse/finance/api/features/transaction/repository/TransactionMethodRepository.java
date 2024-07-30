package dev.canverse.finance.api.features.transaction.repository;

import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import dev.canverse.finance.api.features.transaction.entities.TransactionMethod;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionMethodRepository extends ExtendedJpaRepository<TransactionMethod, Long> {
}