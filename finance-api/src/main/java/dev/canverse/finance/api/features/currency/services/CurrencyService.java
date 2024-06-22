package dev.canverse.finance.api.features.currency.services;

import dev.canverse.finance.api.features.currency.dtos.CurrencyResponse;
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
}
