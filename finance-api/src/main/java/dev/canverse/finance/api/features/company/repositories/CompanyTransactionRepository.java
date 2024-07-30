package dev.canverse.finance.api.features.company.repositories;

import dev.canverse.finance.api.features.company.entities.CompanyTransaction;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyTransactionRepository extends ExtendedJpaRepository<CompanyTransaction, Long> {
}