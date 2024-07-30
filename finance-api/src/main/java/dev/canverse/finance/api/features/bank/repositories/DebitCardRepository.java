package dev.canverse.finance.api.features.bank.repositories;

import dev.canverse.finance.api.features.bank.entities.DebitCard;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface DebitCardRepository extends ExtendedJpaRepository<DebitCard, Long> {
    @Transactional
    @Modifying
    @Query("UPDATE DebitCard dc SET dc.balance = dc.balance + :amount WHERE dc.id = :id")
    void increaseBalance(Long id, BigDecimal amount);

    @Transactional
    @Modifying
    @Query("UPDATE DebitCard dc SET dc.balance = dc.balance - :amount WHERE dc.id = :id")
    void decreaseBalance(Long id, BigDecimal amount);
}