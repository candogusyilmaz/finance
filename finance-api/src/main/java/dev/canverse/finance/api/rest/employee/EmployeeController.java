package dev.canverse.finance.api.rest.employee;

import dev.canverse.finance.api.features.employee.dtos.*;
import dev.canverse.finance.api.features.employee.services.EmployeeService;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {
    private final EmployeeService employeeService;

    @GetMapping("/simple")
    public List<IdNameProjection> getEmployeesSimple() {
        return employeeService.getEmployeesSimple();
    }

    @PostMapping
    public void createEmployee(@Valid @RequestBody CreateEmployeeRequest req) {
        employeeService.createEmployee(req);
    }

    @GetMapping
    public Page<GetEmployeesResponse> getEmployees(@PageableDefault Pageable pageable) {
        return employeeService.getEmployees(pageable);
    }

    @GetMapping("/{id}")
    public GetEmployeeResponse getEmployee(@PathVariable Long id) {
        return employeeService.getEmployee(id);
    }

    @GetMapping("/{id}/salaries")
    public List<GetEmployeeSalaryResponse> getEmployeeSalaries(@PathVariable Long id) {
        return employeeService.getEmployeeSalaries(id);
    }

    @GetMapping("/{id}/payments")
    public List<GetEmployeePaymentResponse> getEmployeePayments(@PathVariable Long id) {
        return employeeService.getEmployeePayments(id);
    }

    @GetMapping("/{id}/employments")
    public List<GetEmployeeEmploymentResponse> getEmployeeEmployments(@PathVariable Long id) {
        return employeeService.getEmployeeEmployments(id);
    }

    @GetMapping("/{id}/assignments")
    public List<GetEmployeeAssignmentResponse> getEmployeeAssignments(@PathVariable Long id) {
        return employeeService.getEmployeeAssignments(id);
    }
}
