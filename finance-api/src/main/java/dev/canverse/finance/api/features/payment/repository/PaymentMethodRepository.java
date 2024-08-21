package dev.canverse.finance.api.features.payment.repository;

import dev.canverse.finance.api.features.payment.entities.PaymentMethod;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentMethodRepository extends ExtendedJpaRepository<PaymentMethod, Long> {
}