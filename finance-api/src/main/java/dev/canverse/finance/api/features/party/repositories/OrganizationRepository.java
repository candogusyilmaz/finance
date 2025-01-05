package dev.canverse.finance.api.features.party.repositories;

import dev.canverse.finance.api.features.party.dtos.GetOrganization;
import dev.canverse.finance.api.features.party.entities.Organization;
import dev.canverse.finance.api.features.party.entities.Party;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrganizationRepository extends ExtendedJpaRepository<Organization, Long> {
    @Query("select o from Organization o where (:#{#f.role} is null or :#{#f.role} in elements(o.roles) )")
    List<Organization> findAll(GetOrganization.Filter f);

    @Query("select (count(p) > 0) from Organization p where p.id = :partyId and :role in elements(p.roles)")
    boolean existsByRole(Long partyId, Party.Role role);

    @Query("select o.id as id, o.name as name from Organization o ")
    List<IdNameProjection> findOrganizationsSimple();
}