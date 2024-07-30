package dev.canverse.finance.api.features.worksite.repositories;

import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import dev.canverse.finance.api.features.worksite.entities.Worksite;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorksiteRepository extends ExtendedJpaRepository<Worksite, Long> {
    @Query("select count(w) > 0 from Worksite w where upper(w.name) = upper(:name)")
    boolean existsByName(@NonNull String name);

    @Query("select w.id as id, w.name as name from Worksite w")
    List<IdNameProjection> findAllSimple();
}