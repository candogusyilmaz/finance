package dev.canverse.finance.api.features.employee.dtos;

public record CreateEmployeeRequest(
        String name,
        String tckn,
        String phoneNumber) {
}