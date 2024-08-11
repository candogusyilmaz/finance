package dev.canverse.finance.api.features.party.repositories;

import dev.canverse.finance.api.features.party.entities.Party;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface PartyRepository extends ExtendedJpaRepository<Party, Long> {
    @Query("select o.id as id, o.name as name from Party o " +
            "left join o.roles role " +
            "where role in :roles " +
            "group by o.id, o.name " +
            "having count(role) = (:#{#roles.size()})")
    List<IdNameProjection> findPartiesSimple(Collection<Party.Role> roles);

    @Query("select o.id as id, o.name as name from Party o " +
            "group by o.id, o.name")
    List<IdNameProjection> findPartiesSimple();

    @Query("select (count(p) > 0) from Party p where p.id = :partyId and :role in elements(p.roles)")
    boolean existsByRole(Long partyId, Party.Role role);
}