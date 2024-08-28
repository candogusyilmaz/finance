package dev.canverse.finance.api.features.employee.dtos;

import dev.canverse.finance.api.features.shared.dtos.AuditResponse;
import dev.canverse.finance.api.features.shared.embeddable.DatePeriod;

public record GetEmployeeEmploymentResponse(Long id, Long employeeId,
                                            DatePeriod formalEmploymentPeriod,
                                            DatePeriod actualEmploymentPeriod,
                                            Organization organization,
                                            AuditResponse createdBy,
                                            AuditResponse updatedBy) {
    public record Organization(Long id, String name) {
    }
}
