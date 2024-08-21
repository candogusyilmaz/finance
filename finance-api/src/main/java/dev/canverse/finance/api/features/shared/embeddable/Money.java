package dev.canverse.finance.api.features.shared.embeddable;

import dev.canverse.finance.api.features.currency.entities.Currency;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import org.hibernate.Hibernate;
import org.springframework.util.Assert;

import java.math.BigDecimal;

@Getter
@Embeddable
public class Money {
    @Column(nullable = false, length = 3)
    private String baseCurrencyCode;

    @Column(nullable = false, length = 3)
    private String currencyCode;

    @Column(nullable = false)
    private Double currencyRate;

    @Positive
    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    public Money(String baseCurrencyCode, Double baseCurrencyRate, String currencyCode, Double currencyRate, BigDecimal amount) {
        this.baseCurrencyCode = baseCurrencyCode;
        this.currencyCode = currencyCode;
        this.currencyRate = currencyRate / baseCurrencyRate;
        this.amount = amount;
    }

    public Money(Currency baseCurrency, Currency currency, BigDecimal amount) {
        Assert.isTrue(Hibernate.isInitialized(baseCurrency), "Base currency must be initialized");
        Assert.isTrue(Hibernate.isInitialized(currency), "Currency must be initialized");
        this.baseCurrencyCode = baseCurrency.getCode();
        this.currencyCode = currency.getCode();
        this.currencyRate = currency.getExchangeRate() / baseCurrency.getExchangeRate();
        this.amount = amount;
    }

    protected Money() {

    }
}
