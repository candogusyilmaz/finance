package dev.canverse.finance.api.features.employee.repositories;

import dev.canverse.finance.api.features.employee.entities.Profession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfessionRepository extends JpaRepository<Profession, Long>, JpaSpecificationExecutor<Profession> {
}