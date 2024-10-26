package dev.canverse.finance.api.features.employee.dtos;

import dev.canverse.finance.api.features.party.dtos.CreateIndividualRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

public record CreateEmployeeRequest(
        @NotNull(message = "Organizasyon gereklidir.")
        Long organizationId,
        @Valid CreateIndividualRequest individual,
        @NotNull(message = "Meslek gereklidir.")
        Long professionId,
        Optional<Long> worksiteId,
        LocalDate officialEmploymentStartDate,
        @NotNull(message = "İşe başlama tarihi gereklidir.")
        LocalDate employmentStartDate,
        @Valid Salary salary
) {
    public record Salary(
            @NotNull(message = "Maaş alanı gereklidir.")
            BigDecimal amount,
            @NotNull(message = "Para birimi alanı gereklidir.")
            Long currencyId,
            @NotNull(message = "Maaş başlangıç tarihi gereklidir.")
            LocalDate startDate
    ) {
    }
}