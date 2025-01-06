package dev.canverse.finance.api.rest.product;

import dev.canverse.finance.api.features.product.dtos.CreateProductPriceRequest;
import dev.canverse.finance.api.features.product.dtos.GetProductPricesForPurchaseRequest;
import dev.canverse.finance.api.features.product.dtos.GetProductPricesForPurchaseResponse;
import dev.canverse.finance.api.features.product.dtos.GetProductPricesResponse;
import dev.canverse.finance.api.features.product.services.ProductPriceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product-prices")
@RequiredArgsConstructor
public class ProductPriceController {
    private final ProductPriceService productPriceService;

    @GetMapping
    public Page<GetProductPricesResponse> getProductPrices(@PageableDefault Pageable pageable) {
        return productPriceService.getProductPrices(pageable);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createProductPrice(@RequestBody CreateProductPriceRequest request) {
        productPriceService.createProductPrice(request);
    }

    @GetMapping("/purchase")
    public List<GetProductPricesForPurchaseResponse> getProductPrices(@Valid GetProductPricesForPurchaseRequest request) {
        return productPriceService.getProductPrices(request);
    }
}
