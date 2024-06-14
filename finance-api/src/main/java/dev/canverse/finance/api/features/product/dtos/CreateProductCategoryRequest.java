package dev.canverse.finance.api.features.product.dtos;

import jakarta.validation.constraints.NotBlank;

public record CreateProductCategoryRequest(
        @NotBlank(message = "Kategori ismi boş olamaz.")
        String name,
        String description) {
}
