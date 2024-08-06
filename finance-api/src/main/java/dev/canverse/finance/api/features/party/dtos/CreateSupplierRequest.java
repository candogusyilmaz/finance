package dev.canverse.finance.api.features.party.dtos;

public record CreateSupplierRequest(
        String name,
        String address,
        String taxOffice,
        String taxRegistrationNumber,
        String phoneNumber,
        String email
) {
}
