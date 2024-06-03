package dev.canverse.finance.api.features.product.repository;

import dev.canverse.finance.api.features.product.entities.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductTypeRepository extends JpaRepository<ProductType, Long>, JpaSpecificationExecutor<ProductType> {
    @Query("SELECT COUNT(p) > 0 FROM ProductType p WHERE lower(p.uniqueCode) = lower(:uniqueCode)")
    boolean existsByUniqueCode(String uniqueCode);
}