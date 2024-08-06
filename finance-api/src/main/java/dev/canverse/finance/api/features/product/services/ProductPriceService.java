package dev.canverse.finance.api.features.product.services;

import dev.canverse.finance.api.exceptions.NotFoundException;
import dev.canverse.finance.api.features.company.repositories.CompanyRepository;
import dev.canverse.finance.api.features.currency.repositories.CurrencyRepository;
import dev.canverse.finance.api.features.employment.repositories.EmployeeRepository;
import dev.canverse.finance.api.features.product.dtos.*;
import dev.canverse.finance.api.features.product.entities.ProductPrice;
import dev.canverse.finance.api.features.product.repository.ProductPriceRepository;
import dev.canverse.finance.api.features.product.repository.ProductRepository;
import dev.canverse.finance.api.features.shared.embeddable.DatePeriod;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductPriceService {
    private final ProductPriceRepository productPriceRepository;
    private final ProductRepository productRepository;
    private final EmployeeRepository employeeRepository;
    private final CompanyRepository companyRepository;
    private final CurrencyRepository currencyRepository;
    private final EntityManager em;

    public void createProductPrice(CreateProductPriceRequest request) {
        var product = productRepository.findById(request.productId())
                .orElseThrow(() -> new NotFoundException("Ürün bulunamadı."));

        var currency = currencyRepository.findById(request.currencyId())
                .orElseThrow(() -> new NotFoundException("Para birimi bulunamadı."));

        var productPrice = new ProductPrice();

        if (request.priceConfirmedById() != null) {
            var priceConfirmedBy = employeeRepository.findById(request.priceConfirmedById())
                    .orElseThrow(() -> new NotFoundException("Fiyat teyit alınan kullanıcı bulunamadı."));

            productPrice.setPriceConfirmedBy(priceConfirmedBy);
        }

        if (request.subcontractorId() != null) {
            var subcontractor = companyRepository.findById(request.subcontractorId())
                    .orElseThrow(() -> new NotFoundException("Taşeron bulunamadı."));

            productPrice.setSubcontractor(subcontractor);
        }

        productPrice.setProduct(product);
        productPrice.setPrice(request.price());
        productPrice.setTimeperiod(new DatePeriod(request.startDate(), request.endDate()));
        productPrice.setCurrency(currency);
        productPrice.setVatRate(request.vatRate());
        productPrice.setWithholdingTaxRate(request.withholdingTaxRate());

        productPriceRepository.save(productPrice);
    }

    public Page<GetProductPricesResponse> getProductPrices(Pageable pageable) {
        return productPriceRepository.getProductPrices(pageable).map(GetProductPricesResponse::from);
    }

    public Page<GetProductPricesResponse> getProductPricesByProductId(Long productId, GetProductPricesRequest query, Pageable pageable) {
        return productPriceRepository.findBy((root, criteriaQuery, criteriaBuilder) ->
        {
            final var predicates = new ArrayList<Predicate>();

            predicates.add(criteriaBuilder.equal(root.get("product").get("id"), productId));
            query.subcontractorId().ifPresent(id -> predicates.add(criteriaBuilder.equal(root.get("subcontractor").get("id"), id)));
            query.startDate().ifPresent(date -> predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("timeperiod").get("startDate"), date)));
            query.endDate().ifPresent(date -> predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("timeperiod").get("endDate"), date)));

            return criteriaBuilder.and(predicates.toArray(new Predicate[]{}));
        }, r -> r.project("product", "subcontractor", "priceConfirmedBy", "currency", "createdBy", "updatedBy").sortBy(pageable.getSort()).page(pageable).map(GetProductPricesResponse::from));
    }

    public List<GetProductPricesForPurchaseResponse> getProductPrices(GetProductPricesForPurchaseRequest req) {
        var query = em.createQuery("""
                        select pp.id, pp.product.id, pp.product.name, pp.price, pp.currency.id, pp.currency.code, pp.currency.exchangeRate, pp.vatRate, pp.withholdingTaxRate,
                        pp.priceConfirmedBy.id, concat(pp.priceConfirmedBy.individual.firstName, ' ', pp.priceConfirmedBy.individual.lastName)
                        from ProductPrice pp
                        left join pp.product
                        left join pp.currency
                        left join pp.priceConfirmedBy.individual
                        where pp.subcontractor.id = :companyId
                        and :date between pp.timeperiod.startDate and pp.timeperiod.endDate
                        """, Object[].class)
                .setParameter("companyId", req.companyId())
                .setParameter("date", req.date())
                .getResultList();

        return query.stream().map(r -> new GetProductPricesForPurchaseResponse(
                (Long) r[0],
                (Long) r[1],
                (String) r[2],
                (BigDecimal) r[3],
                (Long) r[4],
                (String) r[5],
                (Double) r[6],
                (Double) r[7],
                (Double) r[8],
                (Long) r[9],
                (String) r[10]
        )).toList();
    }
}
