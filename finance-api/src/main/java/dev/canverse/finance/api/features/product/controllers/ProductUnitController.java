package dev.canverse.finance.api.features.product.controllers;

import dev.canverse.finance.api.features.product.dtos.CreateProductUnitRequest;
import dev.canverse.finance.api.features.product.dtos.GetProductUnitsResponse;
import dev.canverse.finance.api.features.product.services.ProductUnitService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product-units")
@RequiredArgsConstructor
public class ProductUnitController {
    private final ProductUnitService productUnitService;

    @GetMapping
    public List<GetProductUnitsResponse> getProductCategories() {
        return productUnitService.getProductUnits();
    }

    @PostMapping
    public void createProductUnit(@Valid @RequestBody CreateProductUnitRequest request) {
        productUnitService.createProductUnit(request);
    }
}
