package dev.canverse.finance.api.features.product.repository;

import dev.canverse.finance.api.features.product.entities.Product;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    @Query("SELECT p FROM Product p WHERE p.id = :id")
    @EntityGraph(attributePaths = {"category", "unit"})
    Optional<Product> findByIdIncludeAll(Long id);
}