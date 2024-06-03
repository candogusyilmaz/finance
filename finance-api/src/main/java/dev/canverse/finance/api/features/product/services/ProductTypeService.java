package dev.canverse.finance.api.features.product.services;

import dev.canverse.finance.api.exceptions.NotFoundException;
import dev.canverse.finance.api.features.product.dtos.CreateProductTypeRequest;
import dev.canverse.finance.api.features.product.entities.ProductType;
import dev.canverse.finance.api.features.product.repository.ProductTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductTypeService {
    private final ProductTypeRepository productTypeRepository;

    public void createProductType(CreateProductTypeRequest request) {
        if (productTypeRepository.existsByUniqueCode(request.uniqueCode())) {
            throw new NotFoundException("Ürün tipi kodu zaten kullanımda!");
        }

        var productType = new ProductType();
        productType.setName(request.name());
        productType.setDescription(request.description());
        productType.setUniqueCode(request.uniqueCode());

        productTypeRepository.save(productType);
    }
}
