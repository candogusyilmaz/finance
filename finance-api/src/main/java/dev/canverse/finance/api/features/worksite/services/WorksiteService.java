package dev.canverse.finance.api.features.worksite.services;

import dev.canverse.finance.api.exceptions.BadRequestException;
import dev.canverse.finance.api.features.employee.repositories.EmployeeRepository;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import dev.canverse.finance.api.features.worksite.dtos.CreateWorksiteRequest;
import dev.canverse.finance.api.features.worksite.dtos.GetWorksitesResponse;
import dev.canverse.finance.api.features.worksite.entities.Worksite;
import dev.canverse.finance.api.features.worksite.entities.WorksiteSupervisor;
import dev.canverse.finance.api.features.worksite.repositories.WorksiteRepository;
import lombok.RequiredArgsConstructor;
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

    public void createWorksite(CreateWorksiteRequest request) {
        if (worksiteRepository.existsByName(request.name()))
            throw new BadRequestException("Şantiye adı zaten kullanılıyor.");

        var worksite = new Worksite();
        worksite.setName(request.name());

        if (request.supervisorId() != null && employeeRepository.existsById(request.supervisorId()))
            worksite.getWorksiteSupervisors().add(new WorksiteSupervisor(worksite, employeeRepository.getReferenceById(request.supervisorId()), LocalDate.now()));

        worksiteRepository.save(worksite);
    }

    public List<IdNameProjection> getWorksitesSimple() {
        return worksiteRepository.findAllSimple();
    }

    public Page<GetWorksitesResponse> getWorksites(Pageable page) {
        return worksiteRepository.findBy((root, query, criteriaBuilder) -> null,
                r -> r.project("currentSupervisor.supervisor")
                        .sortBy(page.getSort()).page(page).map(GetWorksitesResponse::from));
    }
}
