package dev.canverse.finance.api.features.purchase.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.Set;

public record CreatePurchaseRequest(
        String description,
        @NotNull(message = "Satın alım tarihi boş olamaz!")
        LocalDateTime purchaseDate,
        @Size(min = 1, message = "En az bir ürün eklemelisiniz!")
        Set<CreatePurchaseItemRequest> purchasedItems) {
}


