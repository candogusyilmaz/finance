package dev.canverse.finance.api.features.product.dtos;

import dev.canverse.finance.api.features.product.entities.ProductPrice;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record GetProductPricesResponse(Long id, CompanyResponse subcontractor, ProductResponse product,
                                       CurrencyResponse currency, BigDecimal price, UserResponse priceConfirmedBy,
                                       Double vatRate, Double withholdingTaxRate, LocalDate startDate,
                                       LocalDate endDate, LocalDateTime createdAt, LocalDateTime updatedAt,
                                       UserResponse createdBy, UserResponse updatedBy) {

    private record CompanyResponse(Long id, String name) {
    }

    private record ProductResponse(Long id, String name) {
    }

    private record CurrencyResponse(Long id, String code, String name) {
    }

    private record UserResponse(Long id, String displayName) {
    }

    public static GetProductPricesResponse from(ProductPrice price) {
        return new GetProductPricesResponse(
                price.getId(),
                price.getSubcontractor() != null ? new CompanyResponse(price.getSubcontractor().getId(), price.getSubcontractor().getName()) : null,
                new ProductResponse(price.getProduct().getId(), price.getProduct().getName()),
                new CurrencyResponse(price.getCurrency().getId(), price.getCurrency().getCode(), price.getCurrency().getName()), price.getPrice(),
                price.getPriceConfirmedBy() != null ? new UserResponse(price.getPriceConfirmedBy().getId(), price.getPriceConfirmedBy().getIndividual().getFullName()) : null,
                price.getVatRate(),
                price.getWithholdingTaxRate(),
                price.getTimeperiod().getStartDate(),
                price.getTimeperiod().getEndDate(),
                price.getTimestamp().getCreatedAt(),
                price.getTimestamp().getUpdatedAt(),
                new UserResponse(price.getCreatedBy().getId(), price.getCreatedBy().getDisplayName()),
                new UserResponse(price.getUpdatedBy().getId(), price.getUpdatedBy().getDisplayName()));
    }
}
