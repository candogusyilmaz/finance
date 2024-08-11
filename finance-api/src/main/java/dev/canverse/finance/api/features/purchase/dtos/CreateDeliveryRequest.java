package dev.canverse.finance.api.features.purchase.dtos;

import dev.canverse.finance.api.features.purchase.entities.DeliveryItem;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record CreateDeliveryRequest(
        @NotNull(message = "Teslim eden taraf boş olamaz.")
        Long senderId,
        String description,
        @NotNull(message = "Para birimi boş olamaz.")
        Long currencyId,
        @NotNull(message = "Teslim tutarı boş olamaz.")
        @Positive(message = "Teslim tutarı pozitif olmalıdır.")
        BigDecimal price,
        @NotNull(message = "Teslim tarihi boş olamaz.")
        LocalDate deliveryDate,
        @Valid
        @Size(min = 1, message = "Teslim edilecek ürün sayısı sıfırdan büyük olmalıdır.")
        List<CreateDeliveryItemRequest> deliveryItems,
        @NotNull(message = "Fatura oluşturulacak mı belirtilmeli.")
        Boolean shouldCreateInvoice
) {

    public record CreateDeliveryItemRequest(
            @NotNull(message = "Teslim edilecek ürün boş olamaz.")
            Long purchaseItemId,
            @Positive(message = "Teslim edilecek ürün miktarı sıfırdan büyük olmalıdır.")
            int quantity,
            String description,
            @NotNull(message = "Teslim durumu boş olamaz.")
            DeliveryItem.Status status) {
    }
}
