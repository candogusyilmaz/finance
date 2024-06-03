package dev.canverse.finance.api.features.bank.repositories;

import dev.canverse.finance.api.features.bank.entities.DebitCard;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DebitCardRepository extends JpaRepository<DebitCard, Long>, JpaSpecificationExecutor<DebitCard> {
    @Transactional
    @Modifying
    @Query("UPDATE DebitCard dc SET dc.balance = dc.balance + :amount WHERE dc.id = :id")
    void increaseBalance(Long id, double amount);

    @Transactional
    @Modifying
    @Query("UPDATE DebitCard dc SET dc.balance = dc.balance - :amount WHERE dc.id = :id")
    void decreaseBalance(Long id, double amount);
}