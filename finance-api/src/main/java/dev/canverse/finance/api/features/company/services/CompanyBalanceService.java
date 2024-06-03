package dev.canverse.finance.api.features.company.services;

import dev.canverse.finance.api.features.company.events.CompanyPurchaseCreatedEvent;
import dev.canverse.finance.api.features.company.repositories.CompanyBalanceRepository;
import dev.canverse.finance.api.features.purchase.entities.PurchaseItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.event.TransactionalEventListener;

@Service
@RequiredArgsConstructor
public class CompanyBalanceService {
    private final CompanyBalanceRepository companyBalanceRepository;

    @TransactionalEventListener
    public void handleCompanyPurchaseCreatedEvent(CompanyPurchaseCreatedEvent event) {
        var company = event.companyPurchase().getCompany();
        var purchase = event.companyPurchase().getPurchase();

        var officialTotal = purchase.getPurchasedItems().stream()
                .filter(PurchaseItem::isOfficial)
                .mapToDouble(purchasedItem -> purchasedItem.getUnitPrice() * purchasedItem.getQuantity())
                .sum();

        var unofficialTotal = purchase.getPurchasedItems().stream()
                .filter(purchaseItem -> !purchaseItem.isOfficial())
                .mapToDouble(purchasedItem -> purchasedItem.getUnitPrice() * purchasedItem.getQuantity())
                .sum();

        companyBalanceRepository.increaseTotalOfficialPurchaseAmount(company.getId(), officialTotal);
        companyBalanceRepository.increaseTotalUnofficialPurchaseAmount(company.getId(), unofficialTotal);
    }
}
