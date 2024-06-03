package dev.canverse.finance.api.features.purchase.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDateTime;

public record CreatePurchaseItemRequest
        (@NotNull(message = "Ürün id'si boş olamaz!")
         Long productId,
         String description,
         @Positive(message = "Adet 0'dan büyük olmalıdır!")
         int quantity,
         @Positive(message = "Birim fiyat pozitif olmalıdır!")
         double unitPrice,
         @NotNull(message = "Para birimi boş olamaz!")
         String currency,
         Double vatRate,
         Double withholdingTaxRate,
         LocalDateTime arrivalDate,
         @NotNull(message = "Resmiyet durumu boş olamaz!")
         boolean official) {

}
