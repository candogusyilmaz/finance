package dev.canverse.finance.api.features.employee.repositories;

import dev.canverse.finance.api.features.employee.entities.EmployeeJobDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeJobDetailRepository extends JpaRepository<EmployeeJobDetail, Long>, JpaSpecificationExecutor<EmployeeJobDetail> {
}