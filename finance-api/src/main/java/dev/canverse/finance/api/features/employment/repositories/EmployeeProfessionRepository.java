package dev.canverse.finance.api.features.employment.repositories;

import dev.canverse.finance.api.features.employment.entities.EmployeeProfession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeProfessionRepository extends JpaRepository<EmployeeProfession, Long>, JpaSpecificationExecutor<EmployeeProfession> {
}