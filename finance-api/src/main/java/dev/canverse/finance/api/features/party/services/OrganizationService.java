package dev.canverse.finance.api.features.party.services;

import dev.canverse.finance.api.features.party.dtos.GetOrganizationRequest;
import dev.canverse.finance.api.features.party.repositories.OrganizationRepository;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrganizationService {
    private final OrganizationRepository organizationRepository;

    /*public Page<GetSupplierResponse> getSuppliersSimple(Pageable page) {
        return organizationRepository
                .findBy((root, query, cb) -> cb.conjunction(), r -> r.sortBy(page.getSort()).page(page).map(GetSupplierResponse::from));
    }*/

    public List<IdNameProjection> getOrganizationsSimple(GetOrganizationRequest request) {
        return organizationRepository.findAllSimple(request);
    }
}
