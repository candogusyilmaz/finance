package dev.canverse.finance.api.features.employee.controllers;

import dev.canverse.finance.api.features.employee.services.EmployeeService;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
