package dev.canverse.finance.api.features.employee.repositories;

import dev.canverse.finance.api.features.employee.entities.Employee;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends ExtendedJpaRepository<Employee, Long>, QueryDslEmployeeRepository {
    @Override
    default String getNotFoundMessage() {
        return "Personel bulunamadı.";
    }

    @Query("SELECT e.id as id, e.name as name FROM Employee e")
    List<IdNameProjection> findAllSimple();
}