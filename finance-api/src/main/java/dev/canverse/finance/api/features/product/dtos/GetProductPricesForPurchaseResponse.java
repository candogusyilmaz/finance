package dev.canverse.finance.api.features.product.dtos;

import java.math.BigDecimal;

public record GetProductPricesForPurchaseResponse(
        Long id,
        Long productId,
        String productName,
        BigDecimal price,
        Long currencyId,
        String currencyCode,
        Double currencyRate,
        Double vatRate,
        Double withholdingTaxRate,
        Long priceConfirmedById,
        String priceConfirmedByFullName
) {
}