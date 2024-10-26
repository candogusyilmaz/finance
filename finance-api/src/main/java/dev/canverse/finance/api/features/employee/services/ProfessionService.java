package dev.canverse.finance.api.features.employee.services;

import dev.canverse.finance.api.features.employee.dtos.CreateProfessionRequest;
import dev.canverse.finance.api.features.employee.dtos.UpdateProfessionNameRequest;
import dev.canverse.finance.api.features.employee.entities.Profession;
import dev.canverse.finance.api.features.employee.repositories.ProfessionRepository;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfessionService {
    private final ProfessionRepository professionRepository;

    public void createProfession(CreateProfessionRequest request) {
        var profession = new Profession();
        profession.setName(request.name());

        professionRepository.save(profession);
    }

    public List<IdNameProjection> getProfessions() {
        return professionRepository.findAllSimple();
    }

    public IdNameProjection getProfessionById(Long id) {
        return professionRepository.findSimpleById(id);
    }

    public void updateProfessionName(Long id, UpdateProfessionNameRequest request) {
        var profession = professionRepository.getById(id, "Meslek bulunamadı.");

        profession.setName(request.name());

        professionRepository.save(profession);
    }
}
