package dev.canverse.finance.api.features.party.services;

import dev.canverse.finance.api.features.party.dtos.CreateOrganizationRequest;
import dev.canverse.finance.api.features.party.dtos.GetOrganization;
import dev.canverse.finance.api.features.party.entities.Organization;
import dev.canverse.finance.api.features.party.repositories.OrganizationRepository;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrganizationService {
    private final OrganizationRepository organizationRepository;

    public void createOrganization(CreateOrganizationRequest request) {
        var organization = new Organization(
                StringUtils.normalizeSpace(request.name()),
                StringUtils.normalizeSpace(request.address()),
                StringUtils.normalizeSpace(request.taxOffice()),
                StringUtils.normalizeSpace(request.taxRegistrationNumber()),
                StringUtils.normalizeSpace(request.phoneNumber()),
                StringUtils.normalizeSpace(request.email())
        );
        organization.addRoles(request.roles());

        organizationRepository.save(organization);
    }

    public List<GetOrganization.Response> getOrganizations(GetOrganization.Filter filter) {
        return organizationRepository.findAll(filter).stream().map(GetOrganization.Response::from).toList();
    }

    public List<IdNameProjection> getOrganizationsSimple() {
        return organizationRepository.findOrganizationsSimple();
    }
}
