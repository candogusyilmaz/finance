package dev.canverse.finance.api.features.party.controllers;

import dev.canverse.finance.api.features.party.dtos.GetOrganizationRequest;
import dev.canverse.finance.api.features.party.services.OrganizationService;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/organizations")
@RequiredArgsConstructor
public class OrganizationController {
    private final OrganizationService organizationService;

    /*@PostMapping
    public void createOrganization(@RequestBody @Valid CreateSupplierRequest request) {
        supplierService.createSupplier(request);
    }*/

    /*@GetMapping
    public Page<GetSupplierResponse> getOrganizations(@PageableDefault Pageable page) {
        return organizationService.getOrganizations(page);
    }*/

    @GetMapping("/simple")
    public List<IdNameProjection> getOrganizationsSimple(GetOrganizationRequest request) {
        return organizationService.getOrganizationsSimple(request);
    }
}
