package dev.canverse.finance.api.features.employee.repositories;

import dev.canverse.finance.api.features.employee.dtos.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface QueryDslEmployeeRepository {
    Page<GetEmployeesResponse> getEmployees(Pageable pageable);

    Optional<GetEmployeeResponse> getEmployee(Long id);

    List<GetEmployeeSalaryResponse> getEmployeeSalaries(Long employeeId);

    List<GetEmployeeAssignmentResponse> getEmployeeAssignments(Long employeeId);

    List<GetEmployeeEmploymentResponse> getEmployeeEmployments(Long employeeId);

    List<GetEmployeePaymentResponse> getEmployeePayments(Long employeeId);
}
