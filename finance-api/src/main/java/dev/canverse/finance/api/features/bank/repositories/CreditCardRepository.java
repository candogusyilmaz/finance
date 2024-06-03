package dev.canverse.finance.api.features.bank.repositories;

import dev.canverse.finance.api.features.bank.entities.CreditCard;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CreditCardRepository extends JpaRepository<CreditCard, Long>, JpaSpecificationExecutor<CreditCard> {
    @Transactional
    @Modifying
    @Query("UPDATE CreditCard cc SET cc.expense = cc.expense + :amount WHERE cc.id = :id")
    void increaseExpense(Long id, double amount);

    @Transactional
    @Modifying
    @Query("UPDATE CreditCard cc SET cc.expense = cc.expense - :amount WHERE cc.id = :id")
    void decreaseExpense(Long id, double amount);
}