package dev.canverse.finance.api.features.company.repositories;

import dev.canverse.finance.api.features.company.entities.CompanyTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyTransactionRepository extends JpaRepository<CompanyTransaction, Long>, JpaSpecificationExecutor<CompanyTransaction> {
}