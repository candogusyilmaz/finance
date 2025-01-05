package dev.canverse.finance.api.features.party.dtos;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record CreateIndividualRequest(
        String socialSecurityNumber,
        @NotNull(message = "İsim alanı gereklidir.")
        String firstName,
        @NotNull(message = "Soyisim alanı gereklidir.")
        String lastName,
        LocalDate birthDate
) {
}
