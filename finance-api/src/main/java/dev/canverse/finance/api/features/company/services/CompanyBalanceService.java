package dev.canverse.finance.api.features.company.services;

import dev.canverse.finance.api.features.company.events.CompanyPurchaseCreatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.event.TransactionalEventListener;

@Service
@RequiredArgsConstructor
public class CompanyBalanceService {

    @TransactionalEventListener
    public void handleCompanyPurchaseCreatedEvent(CompanyPurchaseCreatedEvent event) {
        var company = event.companyPurchase().getCompany();
        var purchase = event.companyPurchase();
        var total = purchase.getTotalPurchasePrice();
        //companyBalanceRepository.increaseTotalOfficialPurchaseAmount(company.getId(), officialTotal);
        //companyBalanceRepository.increaseTotalUnofficialPurchaseAmount(company.getId(), unofficialTotal);
    }
}
