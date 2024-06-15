package dev.canverse.finance.api.features.product.controllers;


import dev.canverse.finance.api.features.product.dtos.CreateProductRequest;
import dev.canverse.finance.api.features.product.dtos.GetProductByIdResponse;
import dev.canverse.finance.api.features.product.dtos.GetProductsResponse;
import dev.canverse.finance.api.features.product.services.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createProduct(@Valid @RequestBody CreateProductRequest request) {
        productService.createProduct(request);
    }

    @GetMapping
    public Page<GetProductsResponse> getProducts(Pageable page) {
        return productService.getProducts(page);
    }

    @GetMapping("/{id}")
    public GetProductByIdResponse getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }
}
