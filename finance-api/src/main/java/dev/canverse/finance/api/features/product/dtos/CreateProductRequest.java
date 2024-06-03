package dev.canverse.finance.api.features.product.dtos;

import jakarta.validation.constraints.NotNull;

public record CreateProductRequest(
        @NotNull(message = "Ürün tipi ID'si boş olamaz!")
        Long productTypeId, String name, String description, String unit) {
}
