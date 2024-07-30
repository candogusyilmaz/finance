package dev.canverse.finance.api.features.bank.repositories;

import dev.canverse.finance.api.features.bank.entities.Card;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends ExtendedJpaRepository<Card, Long> {
}