package dev.canverse.finance.api.features.employee.repositories;

import dev.canverse.finance.api.features.employee.entities.Employee;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface EmployeeRepository extends ExtendedJpaRepository<Employee, Long> {
    @Query("SELECT e.id as id, e.name as name FROM Employee e")
    List<IdNameProjection> findAllSimple();

    @Query("select " +
            "e.id id, e.socialSecurityNumber ssn, e.name name, " +
            "em.formalEmploymentPeriod fep, em.actualEmploymentPeriod aep, em.organization.id organizationId, em.organization.name organizationName, " +
            "ea.worksite.id worksiteId, ea.worksite.name worksiteName " +
            "from Employee e " +
            "left outer join EmployeeAssignment ea on ea.id = (select max(ea.id) from EmployeeAssignment ea where ea.employee.id = e.id) " +
            "left outer join Employment em on em.id = (select max(em.id) from Employment em where em.employee.id = e.id) ")
    Page<Map<String, Object>> findEmployees(Pageable page);
}