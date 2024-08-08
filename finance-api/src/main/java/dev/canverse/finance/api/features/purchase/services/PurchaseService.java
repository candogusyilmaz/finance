package dev.canverse.finance.api.features.purchase.services;

import dev.canverse.finance.api.exceptions.BadRequestException;
import dev.canverse.finance.api.exceptions.NotFoundException;
import dev.canverse.finance.api.features.currency.repositories.CurrencyRepository;
import dev.canverse.finance.api.features.party.entities.Party;
import dev.canverse.finance.api.features.party.repositories.OrganizationRepository;
import dev.canverse.finance.api.features.party.repositories.PartyRepository;
import dev.canverse.finance.api.features.product.repository.ProductRepository;
import dev.canverse.finance.api.features.purchase.dtos.CreatePurchaseRequest;
import dev.canverse.finance.api.features.purchase.dtos.GetPurchasesRequest;
import dev.canverse.finance.api.features.purchase.dtos.GetPurchasesResponse;
import dev.canverse.finance.api.features.purchase.entities.Purchase;
import dev.canverse.finance.api.features.purchase.entities.PurchaseAction;
import dev.canverse.finance.api.features.purchase.entities.PurchaseItem;
import dev.canverse.finance.api.features.purchase.entities.PurchaseStatus;
import dev.canverse.finance.api.features.purchase.repositories.PurchaseRepository;
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
    private final ProductRepository productRepository;
    private final CurrencyRepository currencyRepository;
    private final EntityManager session;

    private final PartyRepository partyRepository;
    private final OrganizationRepository organizationRepository;
    private final PurchaseRepository purchaseRepository;

    @Transactional
    public void createPurchase(CreatePurchaseRequest request) {
        var baseCurrency = currencyRepository.getBaseCurrency();
        var currency = currencyRepository.findById(request.currencyId()).orElseThrow(() -> new NotFoundException("Para birimi bulunamadı!"));

        if (!partyRepository.existsByRole(request.supplierId(), Party.Role.SUPPLIER))
            throw new BadRequestException("Tedarikçi bulunamadı.");

        if (!organizationRepository.existsByRole(request.organizationId(), Party.Role.AFFILIATE))
            throw new BadRequestException("Organizasyon bulunamadı.");

        var purchase = new Purchase();
        purchase.setOrganization(organizationRepository.getReferenceById(request.organizationId()));
        purchase.setSupplier(partyRepository.getReferenceById(request.supplierId()));
        purchase.setPurchaseDate(request.purchaseDate());
        purchase.setDescription(request.description());
        purchase.setOfficial(request.official());
        purchase.setBaseCurrency(baseCurrency);
        purchase.setCurrency(currency);

        var purchaseItems = createPurchaseItems(request, purchase);
        purchase.setPurchaseItems(purchaseItems);

        var purchaseAction = new PurchaseAction();
        purchaseAction.setPurchase(purchase);
        purchaseAction.setStatus(PurchaseStatus.PENDING);
        purchase.getActions().add(purchaseAction);

        purchaseRepository.save(purchase);
    }

    private Set<PurchaseItem> createPurchaseItems(CreatePurchaseRequest request, Purchase purchase) {
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

        return purchaseItems;
    }

    public Page<GetPurchasesResponse> getPurchases(GetPurchasesRequest req, Pageable page) {
        final var queryBuilder = new StringBuilder("""
                    SELECT p.id as id,  p.description, p.purchaseDate, p.official, sum(pi.quantity * pi.unitPrice),
                           p.supplier.id, p.supplier.name,
                           c.id, c.code, c.exchangeRate,
                           pa.id, pa.status, pa.comment, pa.createdAt,
                           org.id, org.name
                    FROM Purchase p
                    INNER JOIN PurchaseAction pa ON pa.id = (select max(pa2.id) from PurchaseAction pa2 where pa2.purchase.id = p.id)
                    INNER JOIN Currency c ON c.code = p.currencyCode
                    INNER JOIN p.purchaseItems pi
                    INNER JOIN p.organization org
                    INNER JOIN p.supplier
                    WHERE 1=1
                """);

        final var parameters = new HashMap<String, Object>();
        req.supplierId().ifPresent(supplierId -> {
            queryBuilder.append("AND p.supplier.id = :supplierId ");
            parameters.put("supplierId", supplierId);
        });

        queryBuilder.append("""
                    GROUP BY p.id, p.supplier.id, p.supplier.name, p.description, c.id, c.code, c.exchangeRate, p.purchaseDate,
                             p.official, pa.id, pa.status, pa.comment, pa.createdAt, org.id, org.name
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
            var supplier = new GetPurchasesResponse.SupplierResponse((Long) row[5], (String) row[6]);
            var organization = new GetPurchasesResponse.OrganizationResponse((Long) row[14], (String) row[15]);
            var currency = new GetPurchasesResponse.CurrencyResponse((Long) row[7], (String) row[8], (Double) row[9]);
            var lastAction = new GetPurchasesResponse.PurchaseActionResponse((Long) row[10], (PurchaseStatus) row[11], (String) row[12], (LocalDateTime) row[13]);
            result.add(new GetPurchasesResponse((Long) row[0], (String) row[1], (LocalDateTime) row[2], (boolean) row[3], (BigDecimal) row[4], organization, supplier, currency, lastAction));
        }

        return new PageImpl<>(result, page, count);
    }
}
