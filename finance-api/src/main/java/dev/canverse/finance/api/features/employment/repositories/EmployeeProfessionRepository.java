package dev.canverse.finance.api.features.employment.repositories;

import dev.canverse.finance.api.features.employment.entities.EmployeeProfession;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeProfessionRepository extends ExtendedJpaRepository<EmployeeProfession, Long> {
}