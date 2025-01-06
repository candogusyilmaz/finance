package dev.canverse.finance.api.rest.common;

import dev.canverse.finance.api.features.currency.dtos.CreateCurrencyRequest;
import dev.canverse.finance.api.features.currency.dtos.CurrencyResponse;
import dev.canverse.finance.api.features.currency.services.CurrencyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/currencies")
@RequiredArgsConstructor
public class CurrencyController {
    private final CurrencyService currencyService;

    @GetMapping
    public List<CurrencyResponse> getCurrencies() {
        return currencyService.getCurrencies();
    }

    @PostMapping
    public void createCurrency(@Valid @RequestBody CreateCurrencyRequest request) {
        currencyService.createCurrency(request);
    }
}
