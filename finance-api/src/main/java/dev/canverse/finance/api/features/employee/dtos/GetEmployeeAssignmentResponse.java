package dev.canverse.finance.api.features.employee.dtos;

import dev.canverse.finance.api.features.shared.dtos.AuditResponse;
import dev.canverse.finance.api.features.shared.embeddable.DatePeriod;

public record GetEmployeeAssignmentResponse(Long id, Long employeeId, DatePeriod period,
                                            Worksite worksite,
                                            AuditResponse createdBy,
                                            AuditResponse updatedBy) {
    public record Worksite(Long id, String name) {
    }
}
