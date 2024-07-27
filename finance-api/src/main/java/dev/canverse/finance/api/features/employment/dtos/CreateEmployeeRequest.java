package dev.canverse.finance.api.features.employment.dtos;

import dev.canverse.finance.api.features.individual.dtos.CreateIndividualRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

public record CreateEmployeeRequest(
        @Valid CreateIndividualRequest individual,
        @Size(min = 1, message = "En az bir meslek gereklidir.")
        Set<Long> professionIds,
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