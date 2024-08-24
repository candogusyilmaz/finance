package dev.canverse.finance.api.features.product.services;

import dev.canverse.finance.api.features.product.dtos.CreateProductUnitRequest;
import dev.canverse.finance.api.features.product.dtos.GetProductUnitsResponse;
import dev.canverse.finance.api.features.product.entities.ProductUnit;
import dev.canverse.finance.api.features.product.repositories.ProductUnitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductUnitService {
    private final ProductUnitRepository productUnitRepository;

    public void createProductUnit(CreateProductUnitRequest request) {
        var unit = new ProductUnit();
        unit.setName(request.name());

        productUnitRepository.save(unit);
    }

    public List<GetProductUnitsResponse> getProductUnits() {
        return productUnitRepository.findAll().stream().map(GetProductUnitsResponse::from).toList();
    }
}
