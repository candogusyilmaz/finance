package dev.canverse.finance.api.features.employee.controllers;

import dev.canverse.finance.api.features.employee.dtos.CreateEmployeeRequest;
import dev.canverse.finance.api.features.employee.dtos.GetEmployeeResponse;
import dev.canverse.finance.api.features.employee.dtos.GetEmployeesResponse;
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
}
