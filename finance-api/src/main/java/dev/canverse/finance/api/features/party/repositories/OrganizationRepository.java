package dev.canverse.finance.api.features.party.repositories;

import dev.canverse.finance.api.features.party.dtos.GetOrganization;
import dev.canverse.finance.api.features.party.entities.Organization;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationRepository extends ExtendedJpaRepository<Organization, Long> {
    @Query("select o from Organization o where (:#{#f.role} is null or :#{#f.role} in elements(o.roles) )")
    Page<Organization> findAll(GetOrganization.Filter f, Pageable pageable);
}