package dev.canverse.finance.api.features.product.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

public record CreateProductPriceRequest(
        Optional<Long> supplierId,
        @NotNull(message = "Ürün boş olamaz!")
        Long productId,
        @NotNull(message = "Ürün fiyatı boş olamaz!")
        @PositiveOrZero(message = "Ürün fiyatı pozitif olmalıdır!")
        BigDecimal price,
        Optional<Long> priceConfirmedById,
        @NotNull(message = "Para birimi boş olamaz!")
        Long currencyId,
        @NotNull(message = "KDV oranı boş olamaz!")
        @PositiveOrZero(message = "KDV oranı pozitif olmalıdır!")
        Double vatRate,
        @NotNull(message = "Stopaj oranı boş olamaz!")
        @PositiveOrZero(message = "Stopaj oranı pozitif olmalıdır!")
        Double withholdingTaxRate,
        @NotNull(message = "Başlangıç tarihi boş olamaz!")
        LocalDate startDate,
        @NotNull(message = "Bitiş tarihi boş olamaz!")
        LocalDate endDate,
        String description
) {
}
