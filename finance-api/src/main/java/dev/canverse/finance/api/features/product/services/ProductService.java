package dev.canverse.finance.api.features.product.services;

import dev.canverse.finance.api.exceptions.NotFoundException;
import dev.canverse.finance.api.features.product.dtos.CreateProductRequest;
import dev.canverse.finance.api.features.product.dtos.ProductResponse;
import dev.canverse.finance.api.features.product.entities.Product;
import dev.canverse.finance.api.features.product.repository.ProductCategoryRepository;
import dev.canverse.finance.api.features.product.repository.ProductRepository;
import dev.canverse.finance.api.features.product.repository.ProductUnitRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final ProductUnitRepository productUnitRepository;

    public void createProduct(CreateProductRequest request) {
        var product = new Product();

        product.setName(StringUtils.normalizeSpace(request.name()));
        product.setDescription(StringUtils.normalizeSpace(request.description()));
        product.setType(request.productType());

        if (request.productCategoryId() != null) {
            var category = productCategoryRepository.findById(request.productCategoryId())
                    .orElseThrow(() -> new NotFoundException("Ürün kategorisi bulunamadı."));
            product.setCategory(category);
        }

        if (request.productUnitId() != null) {
            var unit = productUnitRepository.findById(request.productUnitId())
                    .orElseThrow(() -> new NotFoundException("Ürün birimi bulunamadı."));
            product.setUnit(unit);
        }

        productRepository.save(product);
    }

    public Page<ProductResponse> getProducts(Pageable pageable) {
        return productRepository.findAll(pageable).map(ProductResponse::from);
    }
}
