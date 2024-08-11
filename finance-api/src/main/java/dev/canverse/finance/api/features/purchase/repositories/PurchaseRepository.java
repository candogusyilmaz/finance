package dev.canverse.finance.api.features.purchase.repositories;

import dev.canverse.finance.api.features.purchase.entities.Purchase;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseRepository extends ExtendedJpaRepository<Purchase, Long> {

    @Query("select count(p) > 0 from Purchase p " +
            "where p.id = :id and (select pa2.status from PurchaseAction pa2 where pa2.purchase.id = p.id order by pa2.id desc limit 1) = :status")
    boolean lastStatusEqualTo(Long id, Purchase.Status status);

    @Query("SELECT pi.id, pr.name, pi.quantity - COALESCE(SUM(di.quantity), 0) " +
            "FROM PurchaseItem pi " +
            "LEFT JOIN pi.deliveryItems di " +
            "INNER JOIN pi.product pr " +
            "WHERE pi.purchase.id = :purchaseId " +
            "GROUP BY pi.id, pr.name, pi.quantity " +
            "HAVING pi.quantity > COALESCE(SUM(di.quantity), 0)")
    List<Object[]> findRemainingPurchaseItems(Long purchaseId);

}