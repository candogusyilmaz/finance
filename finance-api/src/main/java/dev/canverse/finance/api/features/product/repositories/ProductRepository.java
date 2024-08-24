package dev.canverse.finance.api.features.product.repositories;

import dev.canverse.finance.api.features.product.entities.Product;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends ExtendedJpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p WHERE p.id = :id")
    @EntityGraph(attributePaths = {"category", "unit"})
    Optional<Product> findByIdIncludeAll(Long id);

    @Query("SELECT p FROM Product p")
    <T> List<T> findAll(Class<T> type);
}