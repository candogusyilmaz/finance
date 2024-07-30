package dev.canverse.finance.api.features.company.repositories;

import dev.canverse.finance.api.features.company.entities.CompanyPurchase;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyPurchaseRepository extends ExtendedJpaRepository<CompanyPurchase, Long> {
}