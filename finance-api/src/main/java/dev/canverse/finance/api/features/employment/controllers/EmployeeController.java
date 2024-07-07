package dev.canverse.finance.api.features.employment.controllers;

import dev.canverse.finance.api.features.employment.dtos.CreateEmployeeRequest;
import dev.canverse.finance.api.features.employment.services.EmployeeService;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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
}
