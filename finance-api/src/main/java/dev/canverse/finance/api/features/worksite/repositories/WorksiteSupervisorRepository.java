package dev.canverse.finance.api.features.worksite.repositories;

import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import dev.canverse.finance.api.features.worksite.entities.WorksiteSupervisor;
import org.springframework.stereotype.Repository;

@Repository
public interface WorksiteSupervisorRepository extends ExtendedJpaRepository<WorksiteSupervisor, Long> {
}