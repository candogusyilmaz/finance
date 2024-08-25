package dev.canverse.finance.api.features.purchase.services;

import dev.canverse.finance.api.exceptions.BadRequestException;
import dev.canverse.finance.api.exceptions.NotFoundException;
import dev.canverse.finance.api.features.currency.repositories.CurrencyRepository;
import dev.canverse.finance.api.features.party.entities.Party;
import dev.canverse.finance.api.features.party.repositories.PartyRepository;
import dev.canverse.finance.api.features.product.repositories.ProductRepository;
import dev.canverse.finance.api.features.purchase.dtos.CreatePurchaseRequest;
import dev.canverse.finance.api.features.purchase.dtos.GetPurchasesRequest;
import dev.canverse.finance.api.features.purchase.dtos.GetPurchasesResponse;
import dev.canverse.finance.api.features.purchase.entities.Purchase;
import dev.canverse.finance.api.features.purchase.entities.PurchaseAction;
import dev.canverse.finance.api.features.purchase.entities.PurchaseItem;
import dev.canverse.finance.api.features.purchase.mappers.PurchaseMapper;
import dev.canverse.finance.api.features.purchase.repositories.PurchaseRepository;
import dev.canverse.finance.api.features.worksite.repositories.WorksiteRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
@RequiredArgsConstructor
public class PurchaseService {
    private final PartyRepository partyRepository;
    private final ProductRepository productRepository;
    private final CurrencyRepository currencyRepository;
    private final PurchaseRepository purchaseRepository;
    private final WorksiteRepository worksiteRepository;

    @Transactional
    public void createPurchase(CreatePurchaseRequest request) {
        var baseCurrency = currencyRepository.getBaseCurrency();
        var currency = currencyRepository.findById(request.currencyId()).orElseThrow(() -> new NotFoundException("Para birimi bulunamadı!"));

        if (!partyRepository.existsByRole(request.supplierId(), Party.Role.SUPPLIER))
            throw new BadRequestException("Tedarikçi bulunamadı.");

        var purchase = new Purchase();
        purchase.setWorksite(worksiteRepository.getReference(request.worksiteId(), "Çalışma yeri bulunamadı."));
        purchase.setSupplier(partyRepository.getReferenceById(request.supplierId()));
        purchase.setPurchaseDate(request.purchaseDate());
        purchase.setDescription(request.description());
        purchase.setOfficial(request.official());
        purchase.setCurrencyInfo(baseCurrency, currency);
        purchase.getActions().add(new PurchaseAction(purchase, Purchase.Status.IN_PROGRESS));

        createPurchaseItems(request, purchase);

        purchaseRepository.save(purchase);
    }

    private void createPurchaseItems(CreatePurchaseRequest request, Purchase purchase) {
        var purchaseItems = new HashSet<PurchaseItem>();

        for (var item : request.purchaseItems()) {
            var purchaseItem = new PurchaseItem();
            purchaseItem.setPurchase(purchase);
            purchaseItem.setProduct(productRepository.getReference(item.productId(), "Ürün bulunamadı."));
            purchaseItem.setQuantity(item.quantity());
            purchaseItem.setUnitPrice(item.unitPrice());
            purchaseItem.setVatRate(item.vatRate());
            purchaseItem.setWithholdingTaxRate(item.withholdingTaxRate());
            purchaseItem.setDescription(item.description());

            purchaseItems.add(purchaseItem);
        }

        purchase.setPurchaseItems(purchaseItems);
    }

    public Page<GetPurchasesResponse> getPurchases(GetPurchasesRequest req, Pageable page) {
        return purchaseRepository.findPurchases(req.supplierId().orElse(null), page)
                .map(PurchaseMapper.INSTANCE::toGetPurchasesResponse);
    }
}
