package dev.canverse.finance.api.features.purchase.services;

import dev.canverse.finance.api.exceptions.NotFoundException;
import dev.canverse.finance.api.features.company.entities.CompanyPurchase;
import dev.canverse.finance.api.features.company.repositories.CompanyPurchaseRepository;
import dev.canverse.finance.api.features.company.repositories.CompanyRepository;
import dev.canverse.finance.api.features.product.repository.ProductRepository;
import dev.canverse.finance.api.features.purchase.dtos.CreateCompanyPurchaseRequest;
import dev.canverse.finance.api.features.purchase.entities.Purchase;
import dev.canverse.finance.api.features.purchase.entities.PurchaseAction;
import dev.canverse.finance.api.features.purchase.entities.PurchaseItem;
import dev.canverse.finance.api.features.purchase.entities.PurchaseStatus;
import dev.canverse.finance.api.features.purchase.repositories.PurchaseRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PurchaseService {
    private final PurchaseRepository purchaseRepository;
    private final CompanyRepository companyRepository;
    private final CompanyPurchaseRepository companyPurchaseRepository;
    private final ProductRepository productRepository;

    @Transactional
    public void createCompanyPurchase(CreateCompanyPurchaseRequest request) {
        var company = companyRepository.findById(request.companyId())
                .orElseThrow(() -> new NotFoundException("Firma bulunamadı!"));

        var purchase = new Purchase();
        purchase.setPurchaseDate(request.purchaseDate());
        purchase.setDescription(request.description());

        var purchaseItems = createPurchaseItems(request);
        purchase.setPurchasedItems(purchaseItems);

        var purchaseAction = new PurchaseAction();
        purchaseAction.setStatus(PurchaseStatus.APPROVED);
        purchase.getActions().add(purchaseAction);

        var companyPurchase = new CompanyPurchase();
        companyPurchase.setCompany(company);
        //companyPurchase.setPurchase(purchase);

        companyPurchaseRepository.save(companyPurchase);
        purchaseRepository.save(purchase);
    }

    private Set<PurchaseItem> createPurchaseItems(CreateCompanyPurchaseRequest request) {
        var purchaseItems = new HashSet<PurchaseItem>();

        for (var item : request.purchasedItems()) {
            var purchaseItem = new PurchaseItem();
            purchaseItem.setProduct(productRepository.findById(item.productId())
                    .orElseThrow(() -> new NotFoundException("Ürün bulunamadı!")));
            purchaseItem.setQuantity(item.quantity());
            purchaseItem.setUnitPrice(item.unitPrice());
            purchaseItem.setVatRate(item.vatRate());
            purchaseItem.setWithholdingTaxRate(item.withholdingTaxRate());
            purchaseItem.setOfficial(item.official());
            purchaseItem.setDescription(item.description());

            purchaseItems.add(purchaseItem);
        }

        return purchaseItems;
    }
}
