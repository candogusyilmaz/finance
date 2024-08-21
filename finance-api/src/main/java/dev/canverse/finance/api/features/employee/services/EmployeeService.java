package dev.canverse.finance.api.features.employee.services;

import dev.canverse.finance.api.exceptions.BadRequestException;
import dev.canverse.finance.api.features.currency.repositories.CurrencyRepository;
import dev.canverse.finance.api.features.employee.dtos.CreateEmployeeRequest;
import dev.canverse.finance.api.features.employee.dtos.GetEmployeesResponse;
import dev.canverse.finance.api.features.employee.entities.*;
import dev.canverse.finance.api.features.employee.repositories.EmployeeRepository;
import dev.canverse.finance.api.features.employee.repositories.ProfessionRepository;
import dev.canverse.finance.api.features.party.repositories.OrganizationRepository;
import dev.canverse.finance.api.features.shared.embeddable.DatePeriod;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import dev.canverse.finance.api.features.worksite.repositories.WorksiteRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final ProfessionRepository professionRepository;
    private final CurrencyRepository currencyRepository;
    private final WorksiteRepository worksiteRepository;
    private final OrganizationRepository organizationRepository;

    @Transactional
    public void createEmployee(CreateEmployeeRequest request) {
        if (request.officialEmploymentStartDate().isBefore(request.employmentStartDate()))
            throw new BadRequestException("Resmi işe başlama tarihi, işe başlama tarihinden önce olamaz.");

        var employee = new Employee();
        employee.setSocialSecurityNumber(request.individual().socialSecurityNumber());
        employee.setName(request.individual().name());
        employee.setBirthDate(request.individual().birthDate());

        createEmployment(request, employee);
        createSalary(request, employee);

        request.worksiteId().ifPresent(id -> {
            var worksite = worksiteRepository.getReference(id, "Çalışma yeri bulunamadı.");
            employee.getAssignments().add(new EmployeeAssignment(worksite, employee, request.employmentStartDate()));
        });

        professionRepository.findAllById(request.professionIds()).stream()
                .map(profession -> new EmployeeProfession(employee, profession))
                .forEach(employee.getProfessions()::add);

        employeeRepository.save(employee);
    }

    private void createEmployment(CreateEmployeeRequest request, Employee employee) {
        var employment = new Employment();
        employment.setEmployee(employee);
        employment.setOrganization(organizationRepository.getReference(request.organizationId(), "Organizasyon bulunamadı."));
        employment.setFormalEmploymentPeriod(new DatePeriod(request.employmentStartDate(), null));
        employment.setActualEmploymentPeriod(new DatePeriod(request.officialEmploymentStartDate(), null));

        employee.getEmployments().add(employment);
    }

    private void createSalary(CreateEmployeeRequest request, Employee employee) {
        var salary = new Salary();
        salary.setWage(request.salary().amount());
        salary.setCurrency(currencyRepository.getReference(request.salary().currencyId(), "Para birimi bulunamadı."));
        salary.setEmployee(employee);
        salary.setEffectivePeriod(new DatePeriod(request.salary().startDate(), null));

        employee.getSalaries().add(salary);
    }

    public List<IdNameProjection> getEmployeesSimple() {
        return employeeRepository.findAllSimple();
    }

    public Page<GetEmployeesResponse> getEmployees(Pageable pageable) {
        return employeeRepository.findBy(
                (root, query, cb) -> cb.conjunction(),
                f -> f.project("currentWorksite.worksite").sortBy(pageable.getSort()).page(pageable).map(GetEmployeesResponse::from));
    }
}
