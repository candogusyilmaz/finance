package dev.canverse.finance.api.features.currency.controllers;

import dev.canverse.finance.api.features.currency.dtos.CurrencyResponse;
import dev.canverse.finance.api.features.currency.services.CurrencyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/currencies")
@RequiredArgsConstructor
public class CurrencyController {
    private final CurrencyService currencyService;

    @GetMapping
    public List<CurrencyResponse> getCurrenciesSimple() {
        return currencyService.getCurrencies();
    }
}
