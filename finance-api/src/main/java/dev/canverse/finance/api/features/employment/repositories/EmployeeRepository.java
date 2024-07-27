package dev.canverse.finance.api.features.employment.repositories;

import dev.canverse.finance.api.features.employment.entities.Employee;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>, JpaSpecificationExecutor<Employee> {
    @Query("SELECT e.id as id, concat(e.individual.firstName, ' ' ,e.individual.lastName ) as name FROM Employee e")
    List<IdNameProjection> findAllSimple();

    @Query("SELECT e.id, e.professions FROM Employee e")
    Page<Object> findAllTest(Pageable pageable);
}