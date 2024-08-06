package dev.canverse.finance.api.features.party.dtos;

import dev.canverse.finance.api.features.party.entities.Supplier;

import java.time.LocalDateTime;

public record GetSupplierResponse(Long id, String name, String address, String taxOffice, String taxRegistrationNumber,
                                  String phoneNumber, String email, LocalDateTime createdAt, LocalDateTime updatedAt) {
    public static GetSupplierResponse from(Supplier sup) {
        return new GetSupplierResponse(
                sup.getId(),
                sup.getName(),
                sup.getAddress(),
                sup.getTaxOffice(),
                sup.getTaxRegistrationNumber(),
                sup.getPhoneNumber(),
                sup.getEmail(),
                sup.getTimestamp().getCreatedAt(),
                sup.getTimestamp().getUpdatedAt()
        );
    }
}
