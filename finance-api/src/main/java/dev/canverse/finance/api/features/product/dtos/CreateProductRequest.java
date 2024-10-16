package dev.canverse.finance.api.features.product.dtos;

import dev.canverse.finance.api.features.product.entities.ProductType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record CreateProductRequest(
        Long productCategoryId,
        @NotBlank(message = "Ürün ismi alanı gereklidir.")
        @Length(min = 3, max = 255, message = "Ürün ismi alanı en az 3 en fazla 255 karakter olabilir.")
        String name,
        String description,
        Long productUnitId,
        @NotNull(message = "Ürün türü alanı gereklidir.")
        ProductType productType) {
}
