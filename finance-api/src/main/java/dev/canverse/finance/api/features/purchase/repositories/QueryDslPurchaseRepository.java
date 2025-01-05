package dev.canverse.finance.api.features.purchase.repositories;

import dev.canverse.finance.api.features.purchase.dtos.GetPurchasesRequest;
import dev.canverse.finance.api.features.purchase.dtos.GetPurchasesResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface QueryDslPurchaseRepository {
    Page<GetPurchasesResponse> getPurchases(GetPurchasesRequest req, Pageable pageable);
}
