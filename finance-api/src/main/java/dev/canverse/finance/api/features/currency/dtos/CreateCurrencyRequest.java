package dev.canverse.finance.api.features.currency.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.hibernate.validator.constraints.Length;

public record CreateCurrencyRequest(
        @Length(min = 3, max = 3, message = "Para birimi kodu 3 karakter olmalıdır.")
        String code,
        @Length(min = 3, max = 255, message = "Para birimi adı 3 ila 255 karakter arasında olmalıdır.")
        String name,
        @Length(min = 1, max = 10, message = "Para birimi sembolü 1 ila 10 karakter arasında olmalıdır.")
        String symbol,
        @Positive(message = "Döviz kuru pozitif olmalıdır.")
        Double exchangeRate,
        @NotNull(message = "Baz para birimi bilgisi boş olamaz.")
        Boolean baseCurrency,
        @NotNull(message = "Fatura para birimi bilgisi boş olamaz.")
        Boolean invoiceCurrency
) {
}
