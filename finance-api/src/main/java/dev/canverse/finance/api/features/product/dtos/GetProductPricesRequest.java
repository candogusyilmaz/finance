package dev.canverse.finance.api.features.product.dtos;

import java.time.LocalDate;
import java.util.Optional;

public record GetProductPricesRequest(
        Optional<Long> subcontractorId,
        Optional<LocalDate> startDate,
        Optional<LocalDate> endDate
) {
}
