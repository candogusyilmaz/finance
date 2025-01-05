package dev.canverse.finance.api.features.party.controllers;

import dev.canverse.finance.api.features.party.dtos.CreateOrganizationRequest;
import dev.canverse.finance.api.features.party.dtos.GetOrganization;
import dev.canverse.finance.api.features.party.services.OrganizationService;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/organizations")
@RequiredArgsConstructor
public class OrganizationController {
    private final OrganizationService organizationService;

    @GetMapping
    public List<GetOrganization.Response> getOrganizations(GetOrganization.Filter filter) {
        return organizationService.getOrganizations(filter);
    }

    @GetMapping("/simple")
    public List<IdNameProjection> getOrganizationsSimple() {
        return organizationService.getOrganizationsSimple();
    }

    @PostMapping
    public void createOrganization(@Valid @RequestBody CreateOrganizationRequest request) {
        organizationService.createOrganization(request);
    }
}
