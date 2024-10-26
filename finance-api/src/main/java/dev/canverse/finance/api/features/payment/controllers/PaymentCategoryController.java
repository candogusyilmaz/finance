package dev.canverse.finance.api.features.payment.controllers;

import dev.canverse.finance.api.features.payment.dtos.CreatePaymentCategoryRequest;
import dev.canverse.finance.api.features.payment.dtos.GetPaymentCategoriesResponse;
import dev.canverse.finance.api.features.payment.services.PaymentCategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payment-categories")
@RequiredArgsConstructor
public class PaymentCategoryController {
    private final PaymentCategoryService paymentCategoryService;

    @GetMapping
    public List<GetPaymentCategoriesResponse> getPaymentCategories() {
        return paymentCategoryService.getPaymentCategories();
    }

    @PostMapping
    public void createPaymentCategory(@Valid @RequestBody CreatePaymentCategoryRequest request) {
        paymentCategoryService.createPaymentCategory(request);
    }
}
