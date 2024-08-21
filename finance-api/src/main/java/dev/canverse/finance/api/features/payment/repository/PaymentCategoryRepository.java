package dev.canverse.finance.api.features.payment.repository;

import dev.canverse.finance.api.features.payment.entities.PaymentCategory;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentCategoryRepository extends ExtendedJpaRepository<PaymentCategory, Long> {
}