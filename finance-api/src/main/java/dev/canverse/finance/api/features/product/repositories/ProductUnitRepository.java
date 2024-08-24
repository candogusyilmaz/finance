package dev.canverse.finance.api.features.product.repositories;

import dev.canverse.finance.api.features.product.entities.ProductUnit;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductUnitRepository extends ExtendedJpaRepository<ProductUnit, Long> {

}