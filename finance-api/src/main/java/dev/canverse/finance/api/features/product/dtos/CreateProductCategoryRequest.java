package dev.canverse.finance.api.features.product.dtos;

import jakarta.validation.constraints.NotBlank;

public record CreateProductCategoryRequest(
        @NotBlank(message = "Ürün tipi adı boş olamaz!")
        String name,
        String description) {
}
