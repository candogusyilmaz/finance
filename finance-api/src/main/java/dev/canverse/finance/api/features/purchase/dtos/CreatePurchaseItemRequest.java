package dev.canverse.finance.api.features.purchase.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

public record CreatePurchaseItemRequest
        (@NotNull(message = "Ürün id'si boş olamaz!")
         Long productId,
         String description,
         @Positive(message = "Adet 0'dan büyük olmalıdır!")
         int quantity,
         @Positive(message = "Birim fiyat pozitif olmalıdır!")
         BigDecimal unitPrice,
         @NotNull(message = "KDV oranı boş olamaz!")
         @PositiveOrZero(message = "KDV oranı pozitif veya sıfır olmalıdır!")
         Double vatRate,
         @NotNull(message = "Stopaj oranı boş olamaz!")
         @PositiveOrZero(message = "Stopaj oranı pozitif veya sıfır olmalıdır!")
         Double withholdingTaxRate
        ) {

}
