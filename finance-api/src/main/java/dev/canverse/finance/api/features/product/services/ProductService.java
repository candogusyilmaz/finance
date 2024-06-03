package dev.canverse.finance.api.features.product.services;

import dev.canverse.finance.api.exceptions.NotFoundException;
import dev.canverse.finance.api.features.product.dtos.CreateProductRequest;
import dev.canverse.finance.api.features.product.entities.Product;
import dev.canverse.finance.api.features.product.repository.ProductRepository;
import dev.canverse.finance.api.features.product.repository.ProductTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductTypeRepository productTypeRepository;

    public void createProduct(CreateProductRequest request) {
        var productType = productTypeRepository.findById(request.productTypeId())
                .orElseThrow(() -> new NotFoundException("Ürün tipi bulunumadı."));

        var product = new Product();

        product.setName(request.name());
        product.setDescription(request.description());
        product.setUnit(request.unit());
        product.setProductType(productType);

        productRepository.save(product);
    }
}
