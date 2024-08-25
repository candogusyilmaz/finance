package dev.canverse.finance.api.features.purchase.repositories;

import dev.canverse.finance.api.features.purchase.entities.Purchase;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

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

    @Query("select p.id id,  p.description description, p.purchaseDate purchaseDate, p.official official, sum(pi.quantity * pi.unitPrice) total," +
            "p.supplier.id supplierId, p.supplier.name supplierName," +
            "c.id currencyId, c.code currencyCode, c.exchangeRate currencyRate," +
            "pa.id lastActionId, pa.status lastActionStatus, pa.comment lastActionComment, pa.createdAt lastActionCreatedAt," +
            "wrk.id worksiteId, wrk.name worksiteName " +
            "from Purchase p " +
            "inner join PurchaseAction pa ON pa.id = (select max(pa2.id) from PurchaseAction pa2 where pa2.purchase.id = p.id)" +
            "inner join Currency c ON c.code = p.currencyCode " +
            "inner join p.purchaseItems pi " +
            "inner join p.worksite wrk " +
            "inner join p.supplier " +
            "where (:supplierId is null or p.supplier.id = :supplierId) " +
            "group by p.id, p.supplier.id, p.supplier.name, p.description, c.id, c.code, c.exchangeRate, p.purchaseDate," +
            "p.official, pa.id, pa.status, pa.comment, pa.createdAt, wrk.id, wrk.name")
    Page<Map<String, Object>> findPurchases(Long supplierId, Pageable page);
}