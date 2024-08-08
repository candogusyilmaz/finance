package dev.canverse.finance.api.features.party.dtos;

import dev.canverse.finance.api.features.party.entities.Party;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Set;

public record CreateOrganizationRequest(
        @NotNull(message = "Ad alanı boş bırakılamaz.")
        String name,
        String address,
        String taxOffice,
        String taxRegistrationNumber,
        String phoneNumber,
        String email,
        @NotNull(message = "En az 1 adet rol seçmelisiniz.")
        @Size(min = 1, message = "En az 1 adet rol seçmelisiniz.")
        Set<Party.Role> roles
) {
}
