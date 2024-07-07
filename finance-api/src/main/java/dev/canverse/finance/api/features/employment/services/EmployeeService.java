package dev.canverse.finance.api.features.employment.services;

import dev.canverse.finance.api.exceptions.NotFoundException;
import dev.canverse.finance.api.features.currency.repositories.CurrencyRepository;
import dev.canverse.finance.api.features.employment.dtos.CreateEmployeeRequest;
import dev.canverse.finance.api.features.employment.entities.Employee;
import dev.canverse.finance.api.features.employment.entities.EmployeeProfession;
import dev.canverse.finance.api.features.employment.entities.EmployeeSalary;
import dev.canverse.finance.api.features.employment.repositories.EmployeeRepository;
import dev.canverse.finance.api.features.employment.repositories.ProfessionRepository;
import dev.canverse.finance.api.features.individual.entities.Individual;
import dev.canverse.finance.api.features.shared.embeddable.DatePeriod;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final ProfessionRepository professionRepository;
    private final CurrencyRepository currencyRepository;

    public void createEmployee(CreateEmployeeRequest request) {
        var employee = new Employee();
        employee.setIndividual(getIndividual(request));
        employee.setEmploymentPeriod(new DatePeriod(request.employmentStartDate(), request.employmentEndDate()));
        employee.setOfficialEmploymentPeriod(new DatePeriod(request.officialEmploymentStartDate(), request.officialEmploymentEndDate()));

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
        employeeSalary.setCurrency(currencyRepository.findById(request.salary().currencyId())
                .orElseThrow(() -> new NotFoundException("Para birimi bulunamadı.")));
        employeeSalary.setEmployee(employee);
        employeeSalary.setEffectivePeriod(new DatePeriod(request.salary().startDate(), null));

        return employeeSalary;
    }

    private Individual getIndividual(CreateEmployeeRequest request) {
        var individual = new Individual();

        individual.setSocialSecurityNumber(request.individual().socialSecurityNumber());
        individual.setFirstName(request.individual().firstName());
        individual.setLastName(request.individual().lastName());
        individual.setBirthDate(request.individual().birthDate());

        return individual;
    }

    public List<IdNameProjection> getEmployeesSimple() {
        return employeeRepository.findAllSimple();
    }
}
