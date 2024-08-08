package dev.canverse.finance.api.features.purchase.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.Set;

public record CreatePurchaseRequest(
        @NotNull(message = "Tedarikçi boş olamaz.")
        Long supplierId,
        @NotNull(message = "Organizasyon boş olamaz.")
        Long organizationId,
        String description,
        @NotNull(message = "Satın alım tarihi boş olamaz.")
        LocalDateTime purchaseDate,
        @NotNull(message = "Para birimi boş olamaz.")
        Long currencyId,
        @Size(min = 1, message = "En az bir ürün eklemelisiniz.")
        Set<CreatePurchaseItemRequest> purchaseItems,
        Boolean official) {
}