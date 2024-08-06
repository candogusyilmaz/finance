package dev.canverse.finance.api.features.party.repositories;

import dev.canverse.finance.api.features.party.entities.Party;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartyRepository extends ExtendedJpaRepository<Party, Long> {
}