package dev.canverse.finance.api.features.company.dtos;

public record CreateCompanyRequest(
        String name,
        String address,
        String taxOffice,
        String taxRegistrationNumber
) {
}
