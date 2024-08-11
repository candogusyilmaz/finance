package dev.canverse.finance.api.features.purchase.controllers;

import dev.canverse.finance.api.features.purchase.dtos.*;
import dev.canverse.finance.api.features.purchase.services.DeliveryService;
import dev.canverse.finance.api.features.purchase.services.PurchaseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchases")
@RequiredArgsConstructor
public class PurchaseController {
    private final PurchaseService purchaseService;
    private final DeliveryService deliveryService;

    @GetMapping
    public Page<GetPurchasesResponse> getPurchases(GetPurchasesRequest req, Pageable pageable) {
        return purchaseService.getPurchases(req, pageable);
    }

    @PostMapping
    public void createPurchase(@Valid @RequestBody CreatePurchaseRequest req) {
        purchaseService.createPurchase(req);
    }

    @GetMapping("/{id}/deliveries")
    public Page<GetDeliveriesResponse> deliverPurchase(@PathVariable Long id, @PageableDefault Pageable page) {
        return deliveryService.getDeliveries(id, page);
    }

    @PostMapping("/{id}/deliveries")
    public void deliverPurchase(@PathVariable Long id, @Valid @RequestBody CreateDeliveryRequest req) {
        deliveryService.createDelivery(id, req);
    }

    @GetMapping("/{id}/undelivered-items")
    public List<GetUndeliveredItemsReponse> getUndeliveredItems(@PathVariable Long id) {
        return deliveryService.getUndeliveredItems(id);
    }
}
