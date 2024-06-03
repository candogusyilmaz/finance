package dev.canverse.finance.api.features.product.dtos;

import jakarta.validation.constraints.NotBlank;

public record CreateProductTypeRequest(
        @NotBlank(message = "Ürün tipi adı boş olamaz!")
        String name,
        String description,
        @NotBlank(message = "Ürün tipi kodu boş olamaz!")
        String uniqueCode) {
}
