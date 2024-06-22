package dev.canverse.finance.api.features.currency.dtos;

import dev.canverse.finance.api.features.currency.entities.Currency;

public record CurrencyResponse(Long id, String name, String code, String symbol) {
    public static CurrencyResponse from(Currency currency) {
        return new CurrencyResponse(currency.getId(), currency.getName(), currency.getCode(), currency.getSymbol());
    }
}
