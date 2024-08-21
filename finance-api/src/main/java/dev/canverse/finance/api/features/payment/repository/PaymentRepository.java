package dev.canverse.finance.api.features.payment.repository;

import dev.canverse.finance.api.features.payment.entities.Payment;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends ExtendedJpaRepository<Payment, Long> {
}