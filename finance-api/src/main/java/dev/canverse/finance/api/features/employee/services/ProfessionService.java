package dev.canverse.finance.api.features.employee.services;

import dev.canverse.finance.api.features.employee.repositories.ProfessionRepository;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfessionService {
    private final ProfessionRepository professionRepository;

    public List<IdNameProjection> getProfessionsSimple() {
        return professionRepository.findAllSimple();
    }
}