package dev.canverse.finance.api.features.party.repositories;

import dev.canverse.finance.api.features.party.dtos.GetSupplierRequest;
import dev.canverse.finance.api.features.party.entities.Supplier;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupplierRepository extends ExtendedJpaRepository<Supplier, Long> {
    @Query("select p.id as id, p.name as name from Supplier p " +
            "where (:#{#req.name()} is null or lower(p.name) like concat('%',:#{#req.name()},'%'))")
    List<IdNameProjection> findAllSimple(GetSupplierRequest req);
}