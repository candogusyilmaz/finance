package dev.canverse.finance.api.features.product.controllers;

import dev.canverse.finance.api.features.product.dtos.GetProductUnitsResponse;
import dev.canverse.finance.api.features.product.services.ProductUnitService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
