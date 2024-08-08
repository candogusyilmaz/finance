package dev.canverse.finance.api.features.product.dtos;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record GetProductPricesForPurchaseRequest(
        @NotNull
        Long supplierId,
        @NotNull
        LocalDate date
) {
}
