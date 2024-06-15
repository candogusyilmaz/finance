package dev.canverse.finance.api.features.product.dtos;

import dev.canverse.finance.api.features.product.entities.ProductCategory;

public record GetProductCategoriesResponse(Long id, String name, String description) {
    public static GetProductCategoriesResponse from(ProductCategory productCategory) {
        if (productCategory == null)
            return null;

        return new GetProductCategoriesResponse(productCategory.getId(), productCategory.getName(), productCategory.getDescription());
    }
}
