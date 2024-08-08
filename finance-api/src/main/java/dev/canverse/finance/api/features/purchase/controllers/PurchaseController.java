package dev.canverse.finance.api.features.purchase.controllers;

import dev.canverse.finance.api.features.purchase.dtos.CreatePurchaseRequest;
import dev.canverse.finance.api.features.purchase.dtos.GetPurchasesRequest;
import dev.canverse.finance.api.features.purchase.dtos.GetPurchasesResponse;
import dev.canverse.finance.api.features.purchase.services.PurchaseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/purchases")
@RequiredArgsConstructor
public class PurchaseController {
    private final PurchaseService purchaseService;

    @GetMapping
    public Page<GetPurchasesResponse> getPurchases(GetPurchasesRequest req, Pageable pageable) {
        return purchaseService.getPurchases(req, pageable);
    }

    @PostMapping
    public void createPurchase(@Valid @RequestBody CreatePurchaseRequest req) {
        purchaseService.createPurchase(req);
    }
}
