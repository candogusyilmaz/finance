package dev.canverse.finance.api.features.product.services;

import dev.canverse.finance.api.exceptions.NotFoundException;
import dev.canverse.finance.api.features.company.repositories.CompanyRepository;
import dev.canverse.finance.api.features.currency.repositories.CurrencyRepository;
import dev.canverse.finance.api.features.employment.repositories.EmployeeRepository;
import dev.canverse.finance.api.features.product.dtos.CreateProductPriceRequest;
import dev.canverse.finance.api.features.product.dtos.GetProductPricesQuery;
import dev.canverse.finance.api.features.product.dtos.GetProductPricesResponse;
import dev.canverse.finance.api.features.product.entities.ProductPrice;
import dev.canverse.finance.api.features.product.repository.ProductPriceRepository;
import dev.canverse.finance.api.features.product.repository.ProductRepository;
import dev.canverse.finance.api.features.shared.embeddable.DatePeriod;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class ProductPriceService {
    private final ProductPriceRepository productPriceRepository;
    private final ProductRepository productRepository;
    private final EmployeeRepository employeeRepository;
    private final CompanyRepository companyRepository;
    private final CurrencyRepository currencyRepository;

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

    public Page<GetProductPricesResponse> getProductPricesByProductId(Long productId, GetProductPricesQuery query, Pageable pageable) {
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
}
