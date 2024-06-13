package dev.canverse.finance.api.features.product.dtos;

import dev.canverse.finance.api.features.product.entities.ProductUnit;

public record ProductUnitResponse(Long id, String name, String symbol) {
    public static ProductUnitResponse from(ProductUnit productUnit) {
        if (productUnit == null)
            return null;

        return new ProductUnitResponse(productUnit.getId(), productUnit.getName(), productUnit.getSymbol());
    }
}
