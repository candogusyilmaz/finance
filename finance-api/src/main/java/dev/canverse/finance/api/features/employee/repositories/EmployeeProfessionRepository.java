package dev.canverse.finance.api.features.employee.repositories;

import dev.canverse.finance.api.features.employee.entities.EmployeeProfession;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeProfessionRepository extends ExtendedJpaRepository<EmployeeProfession, Long> {
}