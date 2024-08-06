package dev.canverse.finance.api.features.account.repositories;

import dev.canverse.finance.api.features.account.entities.CreditCard;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CreditCardRepository extends ExtendedJpaRepository<CreditCard, Long> {


}