package dev.canverse.finance.api.features.worksite.dtos;

import jakarta.validation.constraints.NotNull;

import java.util.Optional;

public record CreateWorksiteRequest(
        @NotNull(message = "Organizasyon bilgisi gereklidir.")
        Long organizationId,
        @NotNull(message = "Çalışma yeri ismi bilgisi gereklidir.")
        String name,
        Optional<Long> supervisorId) {
}
