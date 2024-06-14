package dev.canverse.finance.api.features.product.services;

import dev.canverse.finance.api.features.product.dtos.CreateProductUnitRequest;
import dev.canverse.finance.api.features.product.dtos.ProductUnitResponse;
import dev.canverse.finance.api.features.product.entities.ProductUnit;
import dev.canverse.finance.api.features.product.repository.ProductUnitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductUnitService {
    private final ProductUnitRepository productUnitRepository;

    public void createProductCategory(CreateProductUnitRequest request) {
        var category = new ProductUnit();
        category.setName(request.name());

        productUnitRepository.save(category);
    }

    public List<ProductUnitResponse> getProductUnits() {
        return productUnitRepository.findAll().stream().map(ProductUnitResponse::from).toList();
    }
}
