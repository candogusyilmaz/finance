package dev.canverse.finance.api.features.employee.dtos;

import java.time.LocalDateTime;
import java.util.List;

public record CreateEmployeeSalaryRequest(
        Long employeeId,
        List<LocalDateTime> dueDates
) {
}
