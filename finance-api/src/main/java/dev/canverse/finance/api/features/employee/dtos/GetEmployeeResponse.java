package dev.canverse.finance.api.features.employee.dtos;

import dev.canverse.finance.api.features.shared.embeddable.DatePeriod;

import java.time.LocalDate;
import java.util.List;

public record GetEmployeeResponse(Long id,
                                  String socialSecurityNumber,
                                  String name,
                                  LocalDate birthDate,
                                  Worksite currentWorksite,
                                  Organization currentOrganization,
                                  List<Profession> professions) {
    public record Worksite(Long id, String name) {
    }

    public record Organization(Long id, String name, DatePeriod formalEmploymentPeriod,
                               DatePeriod actualEmploymentPeriod) {
    }

    public record Profession(Long id, String name) {
    }
}
