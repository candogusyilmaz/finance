package dev.canverse.finance.api.features.purchase.repositories;

import dev.canverse.finance.api.features.purchase.entities.PurchaseItem;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseItemRepository extends ExtendedJpaRepository<PurchaseItem, Long> {
}