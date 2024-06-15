package dev.canverse.finance.api.features.product.dtos;

import dev.canverse.finance.api.features.product.entities.Product;
import dev.canverse.finance.api.features.product.entities.ProductType;

import java.time.LocalDateTime;

public record GetProductsResponse(
        Long id,
        GetProductCategoriesResponse category,
        String name,
        String description,
        GetProductUnitsResponse unit,
        ProductType type,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
    public static GetProductsResponse from(Product product) {
        return new GetProductsResponse(
                product.getId(),
                GetProductCategoriesResponse.from(product.getCategory()),
                product.getName(),
                product.getDescription(),
                GetProductUnitsResponse.from(product.getUnit()),
                product.getType(),
                product.getTimestamp().getCreatedAt(),
                product.getTimestamp().getUpdatedAt());
    }
}
