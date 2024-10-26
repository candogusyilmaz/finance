package dev.canverse.finance.api.features.payment.services;

import dev.canverse.finance.api.features.payment.dtos.CreatePaymentCategoryRequest;
import dev.canverse.finance.api.features.payment.dtos.GetPaymentCategoriesResponse;
import dev.canverse.finance.api.features.payment.entities.PaymentCategory;
import dev.canverse.finance.api.features.payment.repository.PaymentCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentCategoryService {
    private final PaymentCategoryRepository paymentCategoryRepository;

    public List<GetPaymentCategoriesResponse> getPaymentCategories() {
        return paymentCategoryRepository.findAll().stream().map(s -> new GetPaymentCategoriesResponse(s.getId(), s.getName())).toList();
    }

    public void createPaymentCategory(CreatePaymentCategoryRequest request) {
        var category = new PaymentCategory();
        category.setName(request.name());

        paymentCategoryRepository.save(category);
    }
}
