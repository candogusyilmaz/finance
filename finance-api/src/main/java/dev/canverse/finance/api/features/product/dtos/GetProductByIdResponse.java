package dev.canverse.finance.api.features.product.dtos;

import dev.canverse.finance.api.features.product.entities.Product;
import dev.canverse.finance.api.features.product.entities.ProductType;
import dev.canverse.finance.api.features.shared.embeddable.Timestamp;

public record GetProductByIdResponse(
        Long id,
        GetProductCategoriesResponse category,
        String name,
        String description,
        GetProductUnitsResponse unit,
        ProductType type,
        Timestamp timestamp) {
    public static GetProductByIdResponse from(Product product) {
        return new GetProductByIdResponse(
                product.getId(),
                GetProductCategoriesResponse.from(product.getCategory()),
                product.getName(),
                product.getDescription(),
                GetProductUnitsResponse.from(product.getUnit()),
                product.getType(),
                product.getTimestamp());
    }
}
