package dev.canverse.finance.api.features.purchase.dtos;

import dev.canverse.finance.api.features.purchase.entities.Delivery;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record GetDeliveriesResponse(
        Long id,
        IdNameResponse sender,
        Long purchaseId,
        LocalDate deliveryDate,
        BigDecimal price,
        Boolean invoiceCreated,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        IdNameResponse createdBy,
        IdNameResponse updatedBy
) {
    private record IdNameResponse(Long id, String name) {
    }

    public static GetDeliveriesResponse from(Delivery entity) {
        return new GetDeliveriesResponse(
                entity.getId(),
                new IdNameResponse(entity.getSender().getId(), entity.getSender().getName()),
                entity.getPurchase().getId(),
                entity.getDeliveryDate(),
                entity.getPrice(),
                false,
                entity.getTimestamp().getCreatedAt(),
                entity.getTimestamp().getUpdatedAt(),
                new IdNameResponse(entity.getCreatedBy().getId(), entity.getCreatedBy().getDisplayName()),
                new IdNameResponse(entity.getUpdatedBy().getId(), entity.getUpdatedBy().getDisplayName())
        );
    }
}
