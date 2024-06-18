package dev.canverse.finance.api.features.company.repositories;

import dev.canverse.finance.api.features.company.entities.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long>, JpaSpecificationExecutor<Company> {
    @Query("select count(c) > 0 from Company c where upper(c.name) = upper(:name)")
    boolean existsByName(@NonNull String name);

    @Query("select c from Company c where upper(c.name) ilike concat('%', upper(:name), '%')")
    <T> List<T> findByName(String name, Class<T> type);

    @Query("select c from Company c")
    <T> List<T> findAll(Class<T> type);
}