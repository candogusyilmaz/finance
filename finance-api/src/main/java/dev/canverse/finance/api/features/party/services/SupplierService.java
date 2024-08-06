package dev.canverse.finance.api.features.party.services;

import dev.canverse.finance.api.features.party.dtos.CreateSupplierRequest;
import dev.canverse.finance.api.features.party.dtos.GetSupplierRequest;
import dev.canverse.finance.api.features.party.dtos.GetSupplierResponse;
import dev.canverse.finance.api.features.party.entities.Supplier;
import dev.canverse.finance.api.features.party.repositories.SupplierRepository;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SupplierService {
    private final SupplierRepository supplierRepository;

    public void createSupplier(CreateSupplierRequest request) {
        var supplier = new Supplier();
        supplier.setName(StringUtils.normalizeSpace(request.name()));
        supplier.setAddress(StringUtils.normalizeSpace(request.address()));
        supplier.setTaxOffice(StringUtils.normalizeSpace(request.taxOffice()));
        supplier.setTaxRegistrationNumber(StringUtils.normalizeSpace(request.taxRegistrationNumber()));
        supplier.setPhoneNumber(StringUtils.normalizeSpace(request.phoneNumber()));
        supplier.setEmail(StringUtils.normalizeSpace(request.email()));

        supplierRepository.save(supplier);
    }

    public Page<GetSupplierResponse> getSuppliersSimple(Pageable page) {
        return supplierRepository
                .findBy((root, query, cb) -> cb.conjunction(), r -> r.sortBy(page.getSort()).page(page).map(GetSupplierResponse::from));
    }

    public List<IdNameProjection> getSuppliersSimple(GetSupplierRequest request) {
        return supplierRepository.findAllSimple(request);
    }
}
