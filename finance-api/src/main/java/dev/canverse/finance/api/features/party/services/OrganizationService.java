package dev.canverse.finance.api.features.party.services;

import dev.canverse.finance.api.features.party.dtos.CreateOrganizationRequest;
import dev.canverse.finance.api.features.party.dtos.GetOrganization;
import dev.canverse.finance.api.features.party.entities.Organization;
import dev.canverse.finance.api.features.party.repositories.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrganizationService {
    private final OrganizationRepository organizationRepository;

    public void createOrganization(CreateOrganizationRequest request) {
        var organization = new Organization();
        organization.setName(StringUtils.normalizeSpace(request.name()));
        organization.setAddress(StringUtils.normalizeSpace(request.address()));
        organization.setTaxOffice(StringUtils.normalizeSpace(request.taxOffice()));
        organization.setTaxRegistrationNumber(StringUtils.normalizeSpace(request.taxRegistrationNumber()));
        organization.setPhoneNumber(StringUtils.normalizeSpace(request.phoneNumber()));
        organization.setEmail(StringUtils.normalizeSpace(request.email()));
        organization.addRoles(request.roles());

        organizationRepository.save(organization);
    }

    public Page<GetOrganization.Response> getOrganizations(GetOrganization.Filter filter, Pageable page) {
        return organizationRepository.findAll(filter, page).map(GetOrganization.Response::from);
    }
}
