package dev.canverse.finance.api.features.worksite.dtos;

import java.time.LocalDate;

public record CreateWorksiteEmployeeRequest(
        Long worksiteId,
        Long employeeId,
        LocalDate startDate,
        LocalDate endDate
) {
}
