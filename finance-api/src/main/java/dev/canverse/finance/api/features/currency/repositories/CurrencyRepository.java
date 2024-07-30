package dev.canverse.finance.api.features.currency.repositories;

import dev.canverse.finance.api.features.currency.entities.Currency;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CurrencyRepository extends ExtendedJpaRepository<Currency, Long> {
}