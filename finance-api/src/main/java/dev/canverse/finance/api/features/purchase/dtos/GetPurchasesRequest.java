package dev.canverse.finance.api.features.purchase.dtos;

import java.util.Optional;

public record GetPurchasesRequest(Optional<Long> companyId) {
}
