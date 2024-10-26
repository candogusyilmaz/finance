package dev.canverse.finance.api.features.product.dtos;

import jakarta.validation.constraints.Size;

public record CreateProductUnitRequest(
        @Size(min = 3, max = 50, message = "Kategori ismi 3 ila 50 karakter arasında olmalıdır.")
        String name,
        @Size(min = 1, max = 50, message = "Sembol 1 ila 8 karakter arasında olmalıdır.")
        String symbol) {
}
