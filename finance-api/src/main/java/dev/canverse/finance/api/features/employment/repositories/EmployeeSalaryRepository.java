package dev.canverse.finance.api.features.employment.repositories;

import dev.canverse.finance.api.features.employment.entities.EmployeeSalary;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeSalaryRepository extends ExtendedJpaRepository<EmployeeSalary, Long> {
}