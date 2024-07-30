package dev.canverse.finance.api.features.worksite.repositories;

import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import dev.canverse.finance.api.features.worksite.entities.WorksiteEmployee;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface WorksiteEmployeeRepository extends ExtendedJpaRepository<WorksiteEmployee, Long> {

    @Query("SELECT COUNT(we) > 0 FROM WorksiteEmployee we WHERE we.worksite.id = :worksiteId AND we.employee.id = :employeeId AND " +
            "we.period.startDate <= :endDate AND we.period.endDate >= :startDate")
    boolean existsWithinPeriod(Long worksiteId, Long employeeId, LocalDate startDate, LocalDate endDate);
}