package dev.canverse.finance.api.features.purchase.services;

import dev.canverse.finance.api.exceptions.NotFoundException;
import dev.canverse.finance.api.features.company.entities.CompanyPurchase;
import dev.canverse.finance.api.features.company.repositories.CompanyPurchaseRepository;
import dev.canverse.finance.api.features.company.repositories.CompanyRepository;
import dev.canverse.finance.api.features.currency.repositories.CurrencyRepository;
import dev.canverse.finance.api.features.product.repository.ProductRepository;
import dev.canverse.finance.api.features.purchase.dtos.CreateCompanyPurchaseRequest;
import dev.canverse.finance.api.features.purchase.dtos.GetPurchasesRequest;
import dev.canverse.finance.api.features.purchase.dtos.GetPurchasesResponse;
import dev.canverse.finance.api.features.purchase.entities.Purchase;
import dev.canverse.finance.api.features.purchase.entities.PurchaseAction;
import dev.canverse.finance.api.features.purchase.entities.PurchaseItem;
import dev.canverse.finance.api.features.purchase.entities.PurchaseStatus;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PurchaseService {
    private final CompanyRepository companyRepository;
    private final CompanyPurchaseRepository companyPurchaseRepository;
    private final ProductRepository productRepository;
    private final CurrencyRepository currencyRepository;
    private final EntityManager session;

    @Transactional
    public void createCompanyPurchase(CreateCompanyPurchaseRequest request) {
        var baseCurrency = currencyRepository.getBaseCurrency();
        var currency = currencyRepository.findById(request.currencyId()).orElseThrow(() -> new NotFoundException("Para birimi bulunamadı!"));

        var purchase = new CompanyPurchase();
        purchase.setCompany(companyRepository.getReference(request.companyId(), "Firma bulunamadı!"));
        purchase.setPurchaseDate(request.purchaseDate());
        purchase.setDescription(request.description());
        purchase.setOfficial(request.official());
        purchase.setBaseCurrency(baseCurrency);
        purchase.setCurrency(currency);

        var purchaseItems = createPurchaseItems(request, purchase);
        purchase.setPurchaseItems(purchaseItems);

        var purchaseAction = new PurchaseAction();
        purchaseAction.setPurchase(purchase);
        purchaseAction.setStatus(PurchaseStatus.APPROVED);
        purchase.getActions().add(purchaseAction);

        companyPurchaseRepository.save(purchase);
    }

    private Set<PurchaseItem> createPurchaseItems(CreateCompanyPurchaseRequest request, Purchase purchase) {
        var purchaseItems = new HashSet<PurchaseItem>();

        for (var item : request.purchaseItems()) {
            var purchaseItem = new PurchaseItem();
            purchaseItem.setPurchase(purchase);
            purchaseItem.setProduct(productRepository.getReference(item.productId(), "Ürün bulunamadı!"));
            purchaseItem.setQuantity(item.quantity());
            purchaseItem.setUnitPrice(item.unitPrice());
            purchaseItem.setVatRate(item.vatRate());
            purchaseItem.setWithholdingTaxRate(item.withholdingTaxRate());
            purchaseItem.setDescription(item.description());

            purchaseItems.add(purchaseItem);
        }

        return purchaseItems;
    }

    public Page<GetPurchasesResponse> getPurchases(GetPurchasesRequest req, Pageable page) {
        final var queryBuilder = new StringBuilder("""
                    SELECT p.id as id,  p.description, p.purchaseDate, p.official, sum(pi.quantity * pi.unitPrice),
                           company.id, company.name,
                           c.id, c.code, c.exchangeRate,
                           pa.id, pa.status, pa.comment, pa.createdAt
                    FROM Purchase p
                    INNER JOIN PurchaseAction pa ON pa.id = (select max(pa2.id) from PurchaseAction pa2 where pa2.purchase.id = p.id)
                    INNER JOIN Currency c ON c.code = p.currencyCode
                    INNER JOIN p.purchaseItems pi
                    LEFT JOIN Company company on company.id = (select cp.company.id from CompanyPurchase cp where cp.id = p.id)
                    WHERE 1=1
                """);

        final var parameters = new HashMap<String, Object>();
        req.companyId().ifPresent(companyId -> {
            queryBuilder.append("AND company.id = :companyId ");
            parameters.put("companyId", companyId);
        });

        queryBuilder.append("""
                    GROUP BY p.id, company.id, company.name, p.description, c.id, c.code, c.exchangeRate, p.purchaseDate,
                             p.official, pa.id, pa.status, pa.comment, pa.createdAt
                    ORDER BY :orderBy
                """);
        final var count = session.createQuery("select count(p.id) from Purchase p", Long.class).getSingleResult();
        final var query = session.createQuery(queryBuilder.toString(), Object[].class)
                .setParameter("orderBy", page.getSortOr(Sort.by(Sort.Direction.ASC, "id")));

        for (var entry : parameters.entrySet())
            query.setParameter(entry.getKey(), entry.getValue());

        query.setFirstResult((int) page.getOffset())
                .setMaxResults(page.getPageSize());

        final var result = new ArrayList<GetPurchasesResponse>();

        for (var row : query.getResultList()) {
            var company = new GetPurchasesResponse.CompanyResponse((Long) row[5], (String) row[6]);
            var currency = new GetPurchasesResponse.CurrencyResponse((Long) row[7], (String) row[8], (Double) row[9]);
            var lastAction = new GetPurchasesResponse.PurchaseActionResponse((Long) row[10], (PurchaseStatus) row[11], (String) row[12], (LocalDateTime) row[13]);
            result.add(new GetPurchasesResponse((Long) row[0], (String) row[1], (LocalDateTime) row[2], (boolean) row[3], (BigDecimal) row[4], company, currency, lastAction));
        }

        return new PageImpl<>(result, page, count);
    }
}
