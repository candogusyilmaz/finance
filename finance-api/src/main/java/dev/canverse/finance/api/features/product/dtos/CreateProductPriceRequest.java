package dev.canverse.finance.api.features.product.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDateTime;

public record CreateProductPriceRequest(
        Long subcontractorId,
        @NotNull(message = "Ürün ID'si boş olamaz!")
        Long productId,
        @NotNull(message = "Ürün fiyatı boş olamaz!")
        @Positive(message = "Ürün fiyatı pozitif olmalıdır!")
        Double price,
        Long priceConfirmedById,
        @NotNull(message = "Para birimi boş olamaz!")
        String currency,
        Double vatRate,
        Double withholdingTaxRate,
        LocalDateTime startDate,
        LocalDateTime endDate,
        @NotNull(message = "Aktiflik durumu boş olamaz!")
        Boolean active
) {
}
