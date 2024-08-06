package dev.canverse.finance.api.features.employee.controllers;

import dev.canverse.finance.api.features.employee.services.ProfessionService;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/professions")
@RequiredArgsConstructor
public class ProfessionController {
    private final ProfessionService professionService;

    @GetMapping("/simple")
    public List<IdNameProjection> getProfessionsSimple() {
        return professionService.getProfessionsSimple();
    }
}
