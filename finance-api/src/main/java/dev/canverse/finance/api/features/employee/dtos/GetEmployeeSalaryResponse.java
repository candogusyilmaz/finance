package dev.canverse.finance.api.features.employee.dtos;

import dev.canverse.finance.api.features.shared.dtos.AuditResponse;
import dev.canverse.finance.api.features.shared.embeddable.DatePeriod;

import java.math.BigDecimal;

public record GetEmployeeSalaryResponse(
        Long id,
        Long employeeId,
        BigDecimal wage,
        Currency currency,
        DatePeriod effectivePeriod,
        AuditResponse createdBy,
        AuditResponse updatedBy
) {
    public record Currency(
            Long id,
            String code
    ) {
    }
}
