package dev.canverse.finance.api.features.employment.dtos;

import dev.canverse.finance.api.features.employment.entities.Employee;
import dev.canverse.finance.api.features.worksite.entities.WorksiteEmployee;

import java.time.LocalDate;

public record GetEmployeesResponse(
        Long id,
        String socialSecurityNumber,
        String firstName,
        String lastName,
        String fullname,
        LocalDate officialEmploymentStartDate,
        LocalDate officialEmploymentEndDate,
        LocalDate employmentStartDate,
        LocalDate employmentEndDate,
        WorksiteResponse worksite
) {
    record WorksiteResponse(Long id, String name) {
        static WorksiteResponse from(WorksiteEmployee worksite) {
            if (worksite == null)
                return null;

            return new WorksiteResponse(worksite.getWorksite().getId(), worksite.getWorksite().getName());
        }
    }

    public static GetEmployeesResponse from(Employee employee) {
        return new GetEmployeesResponse(
                employee.getId(),
                employee.getIndividual().getSocialSecurityNumber(),
                employee.getIndividual().getFirstName(),
                employee.getIndividual().getLastName(),
                employee.getIndividual().getFullName(),
                employee.getOfficialEmploymentPeriod().getStartDate(),
                employee.getOfficialEmploymentPeriod().getEndDate(),
                employee.getEmploymentPeriod().getStartDate(),
                employee.getEmploymentPeriod().getEndDate(),
                WorksiteResponse.from(employee.getCurrentWorksite())
        );
    }
}
