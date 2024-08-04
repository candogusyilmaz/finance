package dev.canverse.finance.api.features.currency.repositories;

import dev.canverse.finance.api.features.currency.entities.Currency;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CurrencyRepository extends ExtendedJpaRepository<Currency, Long> {
    Currency findByCode(String code);

    @Query("select c from Currency c where c.baseCurrency is true")
    Currency getBaseCurrency();
}