package dev.canverse.finance.api.features.party.repositories;

import dev.canverse.finance.api.features.party.dtos.GetOrganizationRequest;
import dev.canverse.finance.api.features.party.entities.Organization;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrganizationRepository extends ExtendedJpaRepository<Organization, Long> {
    @Query("select p.id as id, p.name as name from Organization p " +
            "where (:#{#req.name()} is null or lower(p.name) like concat('%',:#{#req.name()},'%'))")
    List<IdNameProjection> findAllSimple(GetOrganizationRequest req);
}