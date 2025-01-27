package dev.canverse.finance.api.rest.product;


import dev.canverse.finance.api.features.product.dtos.*;
import dev.canverse.finance.api.features.product.services.ProductPriceService;
import dev.canverse.finance.api.features.product.services.ProductService;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final ProductPriceService productPriceService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createProduct(@Valid @RequestBody CreateProductRequest request) {
        productService.createProduct(request);
    }

    @GetMapping
    public Page<GetProductsResponse> getProducts(Pageable page) {
        return productService.getProducts(page);
    }

    @GetMapping("/simple")
    public List<IdNameProjection> getProductsSimple() {
        return productService.getProductsSimple();
    }

    @GetMapping("/{id}")
    public GetProductByIdResponse getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @GetMapping("/{id}/prices")
    public Page<GetProductPricesResponse> getProductPricesByProductId(@PathVariable Long id, GetProductPricesRequest query, Pageable pageable) {
        return productPriceService.getProductPricesByProductId(id, query, pageable);
    }
}
