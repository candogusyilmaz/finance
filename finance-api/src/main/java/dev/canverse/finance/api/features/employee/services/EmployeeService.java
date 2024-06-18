package dev.canverse.finance.api.features.employee.services;

import dev.canverse.finance.api.exceptions.NotFoundException;
import dev.canverse.finance.api.features.employee.dtos.CreateEmployeeJobDetailRequest;
import dev.canverse.finance.api.features.employee.dtos.CreateEmployeeRequest;
import dev.canverse.finance.api.features.employee.entities.Employee;
import dev.canverse.finance.api.features.employee.entities.EmployeeJobDetail;
import dev.canverse.finance.api.features.employee.repositories.EmployeeJobDetailRepository;
import dev.canverse.finance.api.features.employee.repositories.EmployeeRepository;
import dev.canverse.finance.api.features.employee.repositories.ProfessionRepository;
import dev.canverse.finance.api.features.shared.embeddable.DateTimePeriod;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeJobDetailRepository employeeJobDetailRepository;
    private final ProfessionRepository professionRepository;

    public void createEmployee(CreateEmployeeRequest request) {
        var employee = new Employee();
        employee.setName(request.name());
        employee.setTckn(request.tckn());
        employee.setPhoneNumber(request.phoneNumber());

        employeeRepository.save(employee);
    }

    public void createEmployeeJobDetail(CreateEmployeeJobDetailRequest request) {
        var employee = employeeRepository.findById(request.employeeId()).orElseThrow(() -> new NotFoundException("Personel bulunamadı."));
        var profession = professionRepository.findById(request.professionId()).orElseThrow(() -> new NotFoundException("Meslek bulunamadı."));

        var detail = new EmployeeJobDetail();

        detail.setProfession(profession);
        detail.setEmployee(employee);
        detail.setValidityPeriod(new DateTimePeriod(request.validityPeriodStartDate(), request.validityPeriodEndDate()));
        detail.setSocialSecurityStartDate(request.socialSecurityStartDate());
        detail.setSocialSecurityEndDate(request.socialSecurityEndDate());
        detail.setWorkStartDate(request.workStartDate());
        detail.setWorkEndDate(request.workEndDate());
        detail.setSalary(request.salary());

        employeeJobDetailRepository.save(detail);
    }
}
