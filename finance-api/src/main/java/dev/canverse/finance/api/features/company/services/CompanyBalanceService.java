package dev.canverse.finance.api.features.company.services;

import dev.canverse.finance.api.features.company.events.CompanyPurchaseCreatedEvent;
import dev.canverse.finance.api.features.purchase.entities.PurchaseItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.event.TransactionalEventListener;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class CompanyBalanceService {

    @TransactionalEventListener
    public void handleCompanyPurchaseCreatedEvent(CompanyPurchaseCreatedEvent event) {
        var company = event.companyPurchase().getCompany();
        var purchase = event.companyPurchase();

        var officialTotal = purchase.getPurchasedItems().stream()
                .filter(PurchaseItem::isOfficial)
                .map(purchasedItem -> purchasedItem.getUnitPrice().multiply(BigDecimal.valueOf(purchasedItem.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        var unofficialTotal = purchase.getPurchasedItems().stream()
                .filter(purchaseItem -> !purchaseItem.isOfficial())
                .map(purchasedItem -> purchasedItem.getUnitPrice().multiply(BigDecimal.valueOf(purchasedItem.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        //companyBalanceRepository.increaseTotalOfficialPurchaseAmount(company.getId(), officialTotal);
        //companyBalanceRepository.increaseTotalUnofficialPurchaseAmount(company.getId(), unofficialTotal);
    }
}
