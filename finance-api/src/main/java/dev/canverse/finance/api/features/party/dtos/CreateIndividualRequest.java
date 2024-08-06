package dev.canverse.finance.api.features.party.dtos;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record CreateIndividualRequest(
        String socialSecurityNumber,
        @NotNull(message = "İsim alanı gereklidir.")
        String name,
        LocalDate birthDate
) {
}
