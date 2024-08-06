package dev.canverse.finance.api.features.party.repositories;

import dev.canverse.finance.api.features.party.entities.Individual;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IndividualRepository extends ExtendedJpaRepository<Individual, Long> {
}