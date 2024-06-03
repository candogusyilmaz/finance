package dev.canverse.finance.api.features.company.events;

import dev.canverse.finance.api.features.company.entities.CompanyPurchase;

public record CompanyPurchaseCreatedEvent(CompanyPurchase companyPurchase) {
}
