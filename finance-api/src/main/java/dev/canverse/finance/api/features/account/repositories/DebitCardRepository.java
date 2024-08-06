package dev.canverse.finance.api.features.account.repositories;

import dev.canverse.finance.api.features.account.entities.DebitCard;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DebitCardRepository extends ExtendedJpaRepository<DebitCard, Long> {

}