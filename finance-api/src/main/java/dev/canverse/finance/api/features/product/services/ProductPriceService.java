package dev.canverse.finance.api.features.product.services;

import dev.canverse.finance.api.exceptions.NotFoundException;
import dev.canverse.finance.api.features.company.repositories.CompanyRepository;
import dev.canverse.finance.api.features.product.dtos.CreateProductPriceRequest;
import dev.canverse.finance.api.features.product.entities.ProductPrice;
import dev.canverse.finance.api.features.product.repository.ProductPriceRepository;
import dev.canverse.finance.api.features.product.repository.ProductRepository;
import dev.canverse.finance.api.features.shared.embeddable.Timeperiod;
import dev.canverse.finance.api.features.user.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductPriceService {
    private final ProductPriceRepository productPriceRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;

    public void createProductPrice(CreateProductPriceRequest request) {
        var product = productRepository.findById(request.productId())
                .orElseThrow(() -> new NotFoundException("Ürün bulunamadı."));

        var productPrice = new ProductPrice();

        if (request.priceConfirmedById() != null) {
            var priceConfirmedBy = userRepository.findById(request.priceConfirmedById())
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
        productPrice.setTimeperiod(new Timeperiod(request.startDate(), request.endDate()));
        productPrice.setCurrency(request.currency());
        productPrice.setVatRate(request.vatRate());
        productPrice.setWithholdingTaxRate(request.withholdingTaxRate());
        productPrice.setActive(request.active());

        productPriceRepository.save(productPrice);
    }
}
