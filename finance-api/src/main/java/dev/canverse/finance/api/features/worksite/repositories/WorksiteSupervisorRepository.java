package dev.canverse.finance.api.features.worksite.repositories;

import dev.canverse.finance.api.features.worksite.entities.WorksiteSupervisor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface WorksiteSupervisorRepository extends JpaRepository<WorksiteSupervisor, Long>, JpaSpecificationExecutor<WorksiteSupervisor> {
}