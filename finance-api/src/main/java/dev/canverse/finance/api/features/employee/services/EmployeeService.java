package dev.canverse.finance.api.features.employee.services;

import dev.canverse.finance.api.features.currency.repositories.CurrencyRepository;
import dev.canverse.finance.api.features.employee.dtos.CreateEmployeeRequest;
import dev.canverse.finance.api.features.employee.dtos.GetEmployeesResponse;
import dev.canverse.finance.api.features.employee.entities.Employee;
import dev.canverse.finance.api.features.employee.entities.EmployeeProfession;
import dev.canverse.finance.api.features.employee.entities.EmployeeSalary;
import dev.canverse.finance.api.features.employee.repositories.EmployeeRepository;
import dev.canverse.finance.api.features.employee.repositories.ProfessionRepository;
import dev.canverse.finance.api.features.party.repositories.OrganizationRepository;
import dev.canverse.finance.api.features.shared.embeddable.DatePeriod;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import dev.canverse.finance.api.features.worksite.entities.WorksiteEmployee;
import dev.canverse.finance.api.features.worksite.repositories.WorksiteRepository;
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

    public void createEmployee(CreateEmployeeRequest request) {
        var employee = new Employee();
        employee.setOrganization(organizationRepository.getReference(request.organizationId(), "Organizasyon bulunamadı."));
        employee.setSocialSecurityNumber(request.individual().socialSecurityNumber());
        employee.setName(request.individual().name());
        employee.setBirthDate(request.individual().birthDate());
        employee.setEmploymentPeriod(new DatePeriod(request.employmentStartDate(), null));
        employee.setOfficialEmploymentPeriod(new DatePeriod(request.officialEmploymentStartDate(), null));

        worksiteRepository.findById(request.worksiteId())
                .ifPresent(worksite -> employee.getWorksites().add(new WorksiteEmployee(worksite, employee, request.employmentStartDate())));

        // Find professions by ids and add them to the employee as EmployeeProfession
        professionRepository.findAllById(request.professionIds()).stream()
                .map(profession -> new EmployeeProfession(employee, profession))
                .forEach(employee.getProfessions()::add);

        employee.getSalaries().add(getEmployeeSalary(request, employee));

        employeeRepository.save(employee);
    }

    private EmployeeSalary getEmployeeSalary(CreateEmployeeRequest request, Employee employee) {
        var employeeSalary = new EmployeeSalary();

        employeeSalary.setSalary(request.salary().amount());
        employeeSalary.setCurrency(currencyRepository.getReference(request.salary().currencyId(), "Para birimi bulunamadı."));
        employeeSalary.setEmployee(employee);
        employeeSalary.setEffectivePeriod(new DatePeriod(request.salary().startDate(), null));

        return employeeSalary;
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
