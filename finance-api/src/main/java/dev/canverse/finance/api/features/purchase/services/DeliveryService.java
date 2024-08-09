package dev.canverse.finance.api.features.purchase.services;

import dev.canverse.finance.api.exceptions.BadRequestException;
import dev.canverse.finance.api.exceptions.NotFoundException;
import dev.canverse.finance.api.features.party.repositories.PartyRepository;
import dev.canverse.finance.api.features.purchase.dtos.CreateDeliveryRequest;
import dev.canverse.finance.api.features.purchase.dtos.GetDeliveriesResponse;
import dev.canverse.finance.api.features.purchase.entities.Delivery;
import dev.canverse.finance.api.features.purchase.entities.DeliveryItem;
import dev.canverse.finance.api.features.purchase.entities.Purchase;
import dev.canverse.finance.api.features.purchase.entities.PurchaseAction;
import dev.canverse.finance.api.features.purchase.repositories.DeliveryRepository;
import dev.canverse.finance.api.features.purchase.repositories.PurchaseRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeliveryService {
    private final PartyRepository partyRepository;
    private final PurchaseRepository purchaseRepository;
    private final DeliveryRepository deliveryRepository;

    @Transactional
    public void createDelivery(Long purchaseId, CreateDeliveryRequest request) {
        if (!purchaseRepository.lastStatusEqualTo(purchaseId, Purchase.Status.IN_PROGRESS))
            throw new BadRequestException("Satın alım işlemi devam ediyor durumunda olmadığı için teslimat yapılamaz.");

        var purchase = purchaseRepository
                .findBy((root, query, cb) -> cb.equal(root.get("id"), purchaseId),
                        r -> r.project("purchaseItems.deliveries").firstValue());

        var delivery = new Delivery();
        delivery.setPurchase(purchase);
        delivery.setSender(partyRepository.getReference(request.senderId(), "Gönderici bulunamadı."));
        delivery.setAmount(request.amount());
        delivery.setDescription(request.description());
        delivery.setDeliveryDate(request.deliveryDate());
        purchase.getDeliveries().add(delivery);

        createDeliveryItems(request, purchase, delivery);
        updatePurchaseStatus(purchase);

        purchaseRepository.saveAndFlush(purchase);
    }

    private static void createDeliveryItems(CreateDeliveryRequest request, Purchase purchase, Delivery delivery) {
        for (var item : request.deliveryItems()) {
            var purchaseItem = purchase.getPurchaseItems().stream()
                    .filter(pi -> pi.getId().equals(item.purchaseItemId()))
                    .findFirst()
                    .orElseThrow(() -> new NotFoundException("Bu satışa ait teslim edilecek ürün bulunamadı."));

            if (purchaseItem.getQuantity() < purchaseItem.getDeliveredAndReturnedQuantity() + item.quantity())
                throw new BadRequestException("Teslim edilecek ürün sayısı, satın alınan ürün sayısından fazla olamaz.");

            var deliveryItem = new DeliveryItem();
            deliveryItem.setDelivery(delivery);
            deliveryItem.setPurchaseItem(purchaseItem);
            deliveryItem.setQuantity(item.quantity());
            deliveryItem.setDescription(item.description());
            deliveryItem.setStatus(item.status());

            delivery.getDeliveryItems().add(deliveryItem);
        }
    }

    private static void updatePurchaseStatus(Purchase purchase) {
        var totalQuantity = 0;

        for (var purchaseItem : purchase.getPurchaseItems())
            totalQuantity += purchaseItem.getQuantity();


        for (var delivery : purchase.getDeliveries()) {
            for (var deliveryItem : delivery.getDeliveryItems())
                totalQuantity -= deliveryItem.getQuantity();
        }

        if (totalQuantity == 0) {
            var action = new PurchaseAction();
            action.setPurchase(purchase);
            action.setStatus(Purchase.Status.COMPLETED);
            purchase.getActions().add(action);
        }
    }

    public Page<GetDeliveriesResponse> getDeliveries(Long purchaseId, Pageable page) {
        return deliveryRepository.findBy((root, query, cb) -> cb.equal(root.get("purchase").get("id"), purchaseId),
                r -> r.project("sender", "createdBy", "updatedBy").sortBy(page.getSort()).page(page).map(GetDeliveriesResponse::from));
    }
}
