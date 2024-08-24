package dev.canverse.finance.api.features.product.repositories;

import dev.canverse.finance.api.features.product.entities.ProductPrice;
import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductPriceRepository extends ExtendedJpaRepository<ProductPrice, Long> {

    @Query("SELECT pp FROM ProductPrice pp")
    @EntityGraph(attributePaths = {"product", "subcontractor", "priceConfirmedBy", "currency", "createdBy", "updatedBy"})
    Page<ProductPrice> getProductPrices(Pageable pageable);
}