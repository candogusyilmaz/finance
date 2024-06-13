package dev.canverse.finance.api.features.product.dtos;

import dev.canverse.finance.api.features.product.entities.ProductCategory;

public record ProductCategoryResponse(Long id, String name, String description) {
    public static ProductCategoryResponse from(ProductCategory productCategory) {
        if (productCategory == null)
            return null;

        return new ProductCategoryResponse(productCategory.getId(), productCategory.getName(), productCategory.getDescription());
    }
}
