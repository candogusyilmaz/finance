package dev.canverse.finance.api.features.company.dtos;

import dev.canverse.finance.api.features.company.entities.Company;

import java.time.LocalDateTime;

public record GetCompaniesResponse(Long id, String name, String address, String taxOffice, String taxRegistrationNumber,
                                   String phoneNumber, String email, LocalDateTime createdAt, LocalDateTime updatedAt) {
    public static GetCompaniesResponse from(Company company) {
        return new GetCompaniesResponse(
                company.getId(),
                company.getName(),
                company.getAddress(),
                company.getTaxOffice(),
                company.getTaxRegistrationNumber(),
                company.getPhoneNumber(),
                company.getEmail(),
                company.getTimestamp().getCreatedAt(),
                company.getTimestamp().getUpdatedAt()
        );
    }
}
