package dev.canverse.finance.api.features.worksite.dtos;

import java.time.LocalDateTime;

public record CreateWorksiteEmployeeRequest(
        Long worksiteId,
        Long employeeId,
        LocalDateTime startDate,
        LocalDateTime endDate
) {
}
