package dev.canverse.finance.api.features.account.repositories;

import dev.canverse.finance.api.features.account.entities.Account;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends ExtendedJpaRepository<Account, Long> {
}