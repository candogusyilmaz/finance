package dev.canverse.finance.api.features.individual.repositories;

import dev.canverse.finance.api.features.individual.entities.Individual;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IndividualRepository extends ExtendedJpaRepository<Individual, Long> {
    @Query("SELECT CASE WHEN COUNT(i) > 0 THEN TRUE ELSE FALSE END FROM Individual i WHERE i.socialSecurityNumber = :socialSecurityNumber")
    boolean existsBySocialSecurityNumberIgnoreCase(String socialSecurityNumber);
}