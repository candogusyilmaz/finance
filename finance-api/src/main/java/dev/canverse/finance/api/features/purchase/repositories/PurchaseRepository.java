package dev.canverse.finance.api.features.purchase.repositories;

import dev.canverse.finance.api.features.purchase.entities.Purchase;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseRepository extends ExtendedJpaRepository<Purchase, Long> {

    @Query("select count(p) > 0 from Purchase p " +
            "where p.id = :id and (select pa2.status from PurchaseAction pa2 where pa2.purchase.id = p.id order by pa2.id desc limit 1) = :status")
    boolean lastStatusEqualTo(Long id, Purchase.Status status);
}