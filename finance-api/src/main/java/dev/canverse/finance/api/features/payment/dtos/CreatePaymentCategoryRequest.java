package dev.canverse.finance.api.features.payment.dtos;

import jakarta.validation.constraints.Size;

public record CreatePaymentCategoryRequest(
        @Size(min = 3, max = 50, message = "Kategori ismi 3 ila 50 karakter arasında olmalıdır.")
        String name) {
}
