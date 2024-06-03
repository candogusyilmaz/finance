package dev.canverse.finance.api.features.transaction.repository;

import dev.canverse.finance.api.features.transaction.entities.TransactionAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionActionRepository extends JpaRepository<TransactionAction, Long>, JpaSpecificationExecutor<TransactionAction> {
}