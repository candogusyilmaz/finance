package dev.canverse.finance.api.features.product.repository;

import dev.canverse.finance.api.features.product.entities.ProductCategory;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductCategoryRepository extends ExtendedJpaRepository<ProductCategory, Long> {
}