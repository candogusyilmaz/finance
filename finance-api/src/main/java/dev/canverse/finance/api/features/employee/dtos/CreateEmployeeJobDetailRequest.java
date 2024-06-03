package dev.canverse.finance.api.features.employee.dtos;

import java.time.LocalDateTime;

public record CreateEmployeeJobDetailRequest(
        Long employeeId,
        Long professionId,
        LocalDateTime validityPeriodStartDate,
        LocalDateTime validityPeriodEndDate,
        LocalDateTime socialSecurityStartDate,
        LocalDateTime socialSecurityEndDate,
        LocalDateTime workStartDate,
        LocalDateTime workEndDate,
        Double salary
) {
}
