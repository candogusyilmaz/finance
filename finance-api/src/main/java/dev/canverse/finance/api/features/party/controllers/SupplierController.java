package dev.canverse.finance.api.features.party.controllers;

import dev.canverse.finance.api.features.party.dtos.CreateSupplierRequest;
import dev.canverse.finance.api.features.party.dtos.GetSupplierRequest;
import dev.canverse.finance.api.features.party.dtos.GetSupplierResponse;
import dev.canverse.finance.api.features.party.services.SupplierService;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/suppliers")
@RequiredArgsConstructor
public class SupplierController {
    private final SupplierService supplierService;

    @PostMapping
    public void createSupplier(@RequestBody @Valid CreateSupplierRequest request) {
        supplierService.createSupplier(request);
    }

    @GetMapping
    public Page<GetSupplierResponse> getSuppliers(@PageableDefault Pageable page) {
        return supplierService.getSuppliersSimple(page);
    }

    @GetMapping("/simple")
    public List<IdNameProjection> getSuppliersSimple(GetSupplierRequest request) {
        return supplierService.getSuppliersSimple(request);
    }
}
