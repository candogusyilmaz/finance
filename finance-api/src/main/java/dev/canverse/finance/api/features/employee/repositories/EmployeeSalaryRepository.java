package dev.canverse.finance.api.features.employee.repositories;

import dev.canverse.finance.api.features.employee.entities.Salary;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeSalaryRepository extends ExtendedJpaRepository<Salary, Long> {
}