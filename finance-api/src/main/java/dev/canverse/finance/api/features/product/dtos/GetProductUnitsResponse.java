package dev.canverse.finance.api.features.product.dtos;

import dev.canverse.finance.api.features.product.entities.ProductUnit;

public record GetProductUnitsResponse(Long id, String name, String symbol) {
    public static GetProductUnitsResponse from(ProductUnit productUnit) {
        if (productUnit == null)
            return null;

        return new GetProductUnitsResponse(productUnit.getId(), productUnit.getName(), productUnit.getSymbol());
    }
}
