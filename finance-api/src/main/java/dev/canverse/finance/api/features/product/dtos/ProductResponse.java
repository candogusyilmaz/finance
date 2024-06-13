package dev.canverse.finance.api.features.product.dtos;

import dev.canverse.finance.api.features.product.entities.Product;
import dev.canverse.finance.api.features.product.entities.ProductType;

import java.time.LocalDateTime;

public record ProductResponse(
        Long id,
        ProductCategoryResponse category,
        String name,
        String description,
        ProductUnitResponse unit,
        ProductType type,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
    public static ProductResponse from(Product product) {
        return new ProductResponse(
                product.getId(),
                ProductCategoryResponse.from(product.getCategory()),
                product.getName(),
                product.getDescription(),
                ProductUnitResponse.from(product.getUnit()),
                product.getType(),
                product.getTimestamp().getCreatedAt(),
                product.getTimestamp().getUpdatedAt());
    }
}
