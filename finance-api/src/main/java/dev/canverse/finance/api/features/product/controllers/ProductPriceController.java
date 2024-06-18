package dev.canverse.finance.api.features.product.controllers;

import dev.canverse.finance.api.features.product.dtos.GetProductPricesResponse;
import dev.canverse.finance.api.features.product.services.ProductPriceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/product-prices")
@RequiredArgsConstructor
public class ProductPriceController {
    private final ProductPriceService productPriceService;

    @GetMapping
    public Page<GetProductPricesResponse> getProductPrices(@PageableDefault Pageable pageable) {
        return productPriceService.getProductPrices(pageable);
    }
}
