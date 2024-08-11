package dev.canverse.finance.api.features.purchase.dtos;

public record GetUndeliveredItemsReponse(Long purchaseItemId, String productName, Long remainingQuantity) {
}
