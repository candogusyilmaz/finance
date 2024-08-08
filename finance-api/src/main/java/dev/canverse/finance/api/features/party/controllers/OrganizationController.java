package dev.canverse.finance.api.features.party.controllers;

import dev.canverse.finance.api.features.party.dtos.CreateOrganizationRequest;
import dev.canverse.finance.api.features.party.dtos.GetOrganization;
import dev.canverse.finance.api.features.party.services.OrganizationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/organizations")
@RequiredArgsConstructor
public class OrganizationController {
    private final OrganizationService organizationService;

    @GetMapping
    public Page<GetOrganization.Response> getOrganizations(GetOrganization.Filter filter, @PageableDefault Pageable page) {
        return organizationService.getOrganizations(filter, page);
    }

    @PostMapping
    public void createOrganization(@Valid @RequestBody CreateOrganizationRequest request) {
        organizationService.createOrganization(request);
    }
}
