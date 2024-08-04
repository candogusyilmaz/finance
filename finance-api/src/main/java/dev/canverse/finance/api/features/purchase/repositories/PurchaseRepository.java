package dev.canverse.finance.api.features.purchase.repositories;

import dev.canverse.finance.api.features.purchase.entities.Purchase;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseRepository extends ExtendedJpaRepository<Purchase, Long> {

}