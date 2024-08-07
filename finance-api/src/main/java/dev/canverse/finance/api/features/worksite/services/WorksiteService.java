package dev.canverse.finance.api.features.worksite.services;

import dev.canverse.finance.api.exceptions.BadRequestException;
import dev.canverse.finance.api.features.employee.repositories.EmployeeRepository;
import dev.canverse.finance.api.features.party.repositories.OrganizationRepository;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import dev.canverse.finance.api.features.worksite.dtos.CreateWorksiteRequest;
import dev.canverse.finance.api.features.worksite.dtos.GetWorksitesResponse;
import dev.canverse.finance.api.features.worksite.entities.Worksite;
import dev.canverse.finance.api.features.worksite.entities.WorksiteSupervisor;
import dev.canverse.finance.api.features.worksite.repositories.WorksiteRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorksiteService {
    private final WorksiteRepository worksiteRepository;
    private final EmployeeRepository employeeRepository;
    private final OrganizationRepository organizationRepository;

    public void createWorksite(CreateWorksiteRequest request) {
        if (worksiteRepository.existsByName(request.name()))
            throw new BadRequestException("Şantiye adı zaten kullanılıyor.");

        final var worksite = new Worksite();
        worksite.setName(StringUtils.normalizeSpace(request.name()));
        worksite.setOrganization(organizationRepository.getReference(request.organizationId(), "Organizasyon bulunamadı."));

        request.supervisorId().ifPresent(id -> {
            worksite.getWorksiteSupervisors().add(new WorksiteSupervisor(worksite, employeeRepository.getReferenceById(id), LocalDate.now()));
        });

        worksiteRepository.save(worksite);
    }

    public List<IdNameProjection> getWorksitesSimple() {
        return worksiteRepository.findAllSimple();
    }

    public Page<GetWorksitesResponse> getWorksites(Pageable page) {
        return worksiteRepository.findBy((root, query, criteriaBuilder) -> null,
                r -> r.project("currentSupervisor.supervisor", "organization")
                        .sortBy(page.getSort()).page(page).map(GetWorksitesResponse::from));
    }
}
