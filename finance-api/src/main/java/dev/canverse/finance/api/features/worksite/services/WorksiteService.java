package dev.canverse.finance.api.features.worksite.services;

import dev.canverse.finance.api.exceptions.BadRequestException;
import dev.canverse.finance.api.features.worksite.dtos.CreateWorksiteRequest;
import dev.canverse.finance.api.features.worksite.entities.Worksite;
import dev.canverse.finance.api.features.worksite.repositories.WorksiteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WorksiteService {
    private final WorksiteRepository worksiteRepository;

    public void createWorksite(CreateWorksiteRequest request) {
        if (worksiteRepository.existsByName(request.name())) {
            throw new BadRequestException("Şantiye adı zaten kullanımda.");
        }

        var worksite = new Worksite();
        worksite.setName(request.name());

        worksiteRepository.save(worksite);
    }
}
