package dev.canverse.finance.api.features.worksite.repositories;

import dev.canverse.finance.api.features.worksite.entities.Worksite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

@Repository
public interface WorksiteRepository extends JpaRepository<Worksite, Long>, JpaSpecificationExecutor<Worksite> {
    @Query("select count(w) > 0 from Worksite w where upper(w.name) = upper(:name)")
    boolean existsByName(@NonNull String name);
}