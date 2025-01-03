package dev.canverse.finance.api.features.purchase.dtos;

import dev.canverse.finance.api.features.purchase.entities.Purchase;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record GetPurchasesResponse(
        Long id,
        String description,
        LocalDateTime purchaseDate,
        boolean official,
        BigDecimal total,
        WorksiteResponse worksite,
        SupplierResponse supplier,
        CurrencyResponse currency,
        PurchaseActionResponse lastAction
) {
    public record CurrencyResponse(
            Long id,
            String code,
            Double exchangeRate
    ) {
    }

    public record SupplierResponse(
            Long id,
            String name
    ) {
    }

    public record WorksiteResponse(
            Long id,
            String name
    ) {
    }

    public record PurchaseActionResponse(
            Long id,
            Purchase.Status status,
            String comment,
            LocalDateTime createdAt
    ) {
    }
}