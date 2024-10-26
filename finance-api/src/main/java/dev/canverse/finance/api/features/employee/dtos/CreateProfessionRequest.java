package dev.canverse.finance.api.features.employee.dtos;

import jakarta.validation.constraints.Size;

public record CreateProfessionRequest(
        @Size(min = 3, max = 50, message = "Meslek ismi 3 ila 50 karakter arasında olmalıdır.")
        String name) {
}
