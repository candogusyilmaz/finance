package dev.canverse.finance.api.features.employee.dtos;

import dev.canverse.finance.api.features.shared.embeddable.DatePeriod;

public record GetEmployeesResponse(Long id,
                                   String socialSecurityNumber,
                                   String name,
                                   Worksite currentWorksite,
                                   Organization currentOrganization) {

    public record Worksite(Long id, String name) {
    }

    public record Organization(Long id, String name, DatePeriod formalEmploymentPeriod,
                               DatePeriod actualEmploymentPeriod) {
    }
}
