package dev.canverse.finance.api.features.product.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.time.LocalDate;

public record CreateProductPriceRequest(
        Long subcontractorId,
        @NotNull(message = "Ürün boş olamaz!")
        Long productId,
        @NotNull(message = "Ürün fiyatı boş olamaz!")
        @PositiveOrZero(message = "Ürün fiyatı pozitif olmalıdır!")
        Double price,
        Long priceConfirmedById,
        @NotNull(message = "Para birimi boş olamaz!")
        Long currencyId,
        Double vatRate,
        Double withholdingTaxRate,
        @NotNull(message = "Başlangıç tarihi boş olamaz!")
        LocalDate startDate,
        @NotNull(message = "Bitiş tarihi boş olamaz!")
        LocalDate endDate,
        String description
) {
}
