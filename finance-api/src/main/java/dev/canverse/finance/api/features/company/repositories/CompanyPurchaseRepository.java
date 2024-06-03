package dev.canverse.finance.api.features.company.repositories;

import dev.canverse.finance.api.features.company.entities.CompanyPurchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyPurchaseRepository extends JpaRepository<CompanyPurchase, Long>, JpaSpecificationExecutor<CompanyPurchase> {
}