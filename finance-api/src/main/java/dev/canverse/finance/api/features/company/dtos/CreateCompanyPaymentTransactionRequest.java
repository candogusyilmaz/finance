package dev.canverse.finance.api.features.company.dtos;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record CreateCompanyPaymentTransactionRequest(
        @NotNull(message = "Firma boş olamaz!")
        Long companyId,
        @NotNull(message = "Kart boş olamaz!")
        Long cardId,
        Long transactionCategoryId,
        Long transactionMethodId,
        @NotNull(message = "Para birimi boş olamaz!")
        String currency,
        @NotNull(message = "Tutar boş olamaz!")
        Double amount,
        @NotNull(message = "Resmilik durumu boş olamaz!")
        Boolean official,
        @NotNull(message = "Tarih boş olamaz!")
        LocalDateTime date) {
}
