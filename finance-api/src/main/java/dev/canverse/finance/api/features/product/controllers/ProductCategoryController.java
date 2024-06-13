package dev.canverse.finance.api.features.product.controllers;

import dev.canverse.finance.api.features.product.dtos.ProductCategoryResponse;
import dev.canverse.finance.api.features.product.services.ProductCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/product-categories")
@RequiredArgsConstructor
public class ProductCategoryController {
    private final ProductCategoryService productCategoryService;

    @GetMapping
    public List<ProductCategoryResponse> getProductCategories() {
        return productCategoryService.getProductCategories();
    }
}
