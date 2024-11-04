package dev.canverse.finance.api.features.currency.services;

import dev.canverse.finance.api.features.currency.dtos.CreateCurrencyRequest;
import dev.canverse.finance.api.features.currency.dtos.CurrencyResponse;
import dev.canverse.finance.api.features.currency.entities.Currency;
import dev.canverse.finance.api.features.currency.repositories.CurrencyRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CurrencyService {
    private final CurrencyRepository currencyRepository;

    public List<CurrencyResponse> getCurrencies() {
        return currencyRepository.findAll().stream()
                .map(CurrencyResponse::from)
                .toList();
    }

    public void createCurrency(CreateCurrencyRequest request) {
        if (currencyRepository.existsByCode(request.code())) {
            throw new IllegalArgumentException("Bu para birimi kodu ile bir kayıt zaten mevcut.");
        }

        if (request.baseCurrency() && currencyRepository.existsByBaseCurrency(true)) {
            throw new IllegalArgumentException("Zaten bir baz para birimi mevcut.");
        }

        if (request.invoiceCurrency() && currencyRepository.existsByInvoiceCurrency(true)) {
            throw new IllegalArgumentException("Zaten bir fatura para birimi mevcut.");
        }

        var currency = new Currency();
        currency.setCode(request.code());
        currency.setName(request.name());
        currency.setSymbol(request.symbol());
        currency.setExchangeRate(request.exchangeRate());
        currency.setBaseCurrency(request.baseCurrency());
        currency.setInvoiceCurrency(request.baseCurrency());

        currencyRepository.save(currency);
    }
}
