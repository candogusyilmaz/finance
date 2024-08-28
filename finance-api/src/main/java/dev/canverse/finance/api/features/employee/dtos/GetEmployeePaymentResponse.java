package dev.canverse.finance.api.features.employee.dtos;

import dev.canverse.finance.api.features.payment.entities.Payment;
import dev.canverse.finance.api.features.shared.dtos.AuditResponse;
import dev.canverse.finance.api.features.shared.embeddable.Money;

import java.time.LocalDate;

public record GetEmployeePaymentResponse(Long id,
                                         String description,
                                         Money money,
                                         LocalDate date,
                                         LatestPaymentAction status,
                                         PaymentCategory category,
                                         Party fromParty,
                                         Party toParty,
                                         PaymentMethod method
) {

    public record Party(Long id, String name) {
    }

    public record PaymentMethod(Long id, String name) {
    }

    public record PaymentCategory(Long id, String name) {
    }

    public record LatestPaymentAction(Long id, Payment.Status status, AuditResponse audit) {
    }
}
