package dev.canverse.finance.api.features.employment.repositories;

import dev.canverse.finance.api.features.employment.entities.Profession;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfessionRepository extends ExtendedJpaRepository<Profession, Long> {
    @Query("select p.id as id, p.name as name from Profession p")
    List<IdNameProjection> findAllSimple();
}