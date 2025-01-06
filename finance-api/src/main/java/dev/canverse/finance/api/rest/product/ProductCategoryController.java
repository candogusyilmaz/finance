package dev.canverse.finance.api.rest.product;

import dev.canverse.finance.api.features.product.dtos.CreateProductCategoryRequest;
import dev.canverse.finance.api.features.product.dtos.GetProductCategoriesResponse;
import dev.canverse.finance.api.features.product.services.ProductCategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product-categories")
@RequiredArgsConstructor
public class ProductCategoryController {
    private final ProductCategoryService productCategoryService;

    @GetMapping
    public List<GetProductCategoriesResponse> getProductCategories() {
        return productCategoryService.getProductCategories();
    }

    @PostMapping
    public void createProductCategory(@Valid @RequestBody CreateProductCategoryRequest request) {
        productCategoryService.createProductCategory(request);
    }
}
