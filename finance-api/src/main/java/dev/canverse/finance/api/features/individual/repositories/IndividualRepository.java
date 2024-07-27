package dev.canverse.finance.api.features.individual.repositories;

import dev.canverse.finance.api.features.individual.entities.Individual;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IndividualRepository extends JpaRepository<Individual, Long>, JpaSpecificationExecutor<Individual> {
    @Query("SELECT CASE WHEN COUNT(i) > 0 THEN TRUE ELSE FALSE END FROM Individual i WHERE i.socialSecurityNumber = :socialSecurityNumber")
    boolean existsBySocialSecurityNumberIgnoreCase(String socialSecurityNumber);
}