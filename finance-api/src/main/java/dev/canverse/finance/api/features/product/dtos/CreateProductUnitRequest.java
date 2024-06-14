package dev.canverse.finance.api.features.product.dtos;

import jakarta.validation.constraints.NotBlank;

public record CreateProductUnitRequest(
        @NotBlank(message = "Birim ismi boş olamaz.")
        String name) {
}
