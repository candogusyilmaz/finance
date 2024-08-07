package dev.canverse.finance.api.features.employee.dtos;

import dev.canverse.finance.api.features.employee.entities.Employee;
import dev.canverse.finance.api.features.party.entities.Organization;
import dev.canverse.finance.api.features.worksite.entities.WorksiteEmployee;

import java.time.LocalDate;

public record GetEmployeesResponse(
        Long id,
        String socialSecurityNumber,
        String name,
        LocalDate officialEmploymentStartDate,
        LocalDate officialEmploymentEndDate,
        LocalDate employmentStartDate,
        LocalDate employmentEndDate,
        WorksiteResponse worksite,
        OrganizationResponse organization
) {
    record WorksiteResponse(Long id, String name) {
        static WorksiteResponse from(WorksiteEmployee worksite) {
            if (worksite == null)
                return null;

            return new WorksiteResponse(worksite.getWorksite().getId(), worksite.getWorksite().getName());
        }
    }

    private record OrganizationResponse(Long id, String name) {
        public static OrganizationResponse from(Organization org) {
            return new OrganizationResponse(
                    org.getId(),
                    org.getName()
            );
        }
    }

    public static GetEmployeesResponse from(Employee employee) {
        return new GetEmployeesResponse(
                employee.getId(),
                employee.getSocialSecurityNumber(),
                employee.getName(),
                employee.getOfficialEmploymentPeriod().getStartDate(),
                employee.getOfficialEmploymentPeriod().getEndDate(),
                employee.getEmploymentPeriod().getStartDate(),
                employee.getEmploymentPeriod().getEndDate(),
                WorksiteResponse.from(employee.getCurrentWorksite()),
                OrganizationResponse.from(employee.getOrganization())
        );
    }
}
