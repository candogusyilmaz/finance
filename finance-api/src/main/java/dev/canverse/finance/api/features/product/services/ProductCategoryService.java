package dev.canverse.finance.api.features.product.services;

import dev.canverse.finance.api.features.product.dtos.CreateProductCategoryRequest;
import dev.canverse.finance.api.features.product.dtos.GetProductCategoriesResponse;
import dev.canverse.finance.api.features.product.entities.ProductCategory;
import dev.canverse.finance.api.features.product.repositories.ProductCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductCategoryService {
    private final ProductCategoryRepository productCategoryRepository;

    public void createProductCategory(CreateProductCategoryRequest request) {
        var category = new ProductCategory();
        category.setName(request.name());
        category.setDescription(request.description());

        productCategoryRepository.save(category);
    }

    public List<GetProductCategoriesResponse> getProductCategories() {
        return productCategoryRepository.findAll().stream().map(GetProductCategoriesResponse::from).toList();
    }
}
