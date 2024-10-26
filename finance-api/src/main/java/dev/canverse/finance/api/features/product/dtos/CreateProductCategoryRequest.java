package dev.canverse.finance.api.features.product.dtos;

import jakarta.validation.constraints.Size;

public record CreateProductCategoryRequest(
        @Size(min = 3, max = 50, message = "Kategori ismi 3 ila 50 karakter arasında olmalıdır.")
        String name,
        String description) {
}
