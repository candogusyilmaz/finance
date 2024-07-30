package dev.canverse.finance.api.features.transaction.repository;

import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import dev.canverse.finance.api.features.transaction.entities.TransactionCategory;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionCategoryRepository extends ExtendedJpaRepository<TransactionCategory, Long> {
}