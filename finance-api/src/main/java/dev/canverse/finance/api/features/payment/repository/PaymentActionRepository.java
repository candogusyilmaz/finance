package dev.canverse.finance.api.features.payment.repository;

import dev.canverse.finance.api.features.payment.entities.PaymentAction;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentActionRepository extends ExtendedJpaRepository<PaymentAction, Long> {
}