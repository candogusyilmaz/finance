package dev.canverse.finance.api.rest.common;

import dev.canverse.finance.api.features.employee.dtos.CreateProfessionRequest;
import dev.canverse.finance.api.features.employee.dtos.UpdateProfessionNameRequest;
import dev.canverse.finance.api.features.employee.services.ProfessionService;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/professions")
@RequiredArgsConstructor
public class ProfessionController {
    private final ProfessionService professionService;

    @GetMapping
    public List<IdNameProjection> getProfessions() {
        return professionService.getProfessions();
    }

    @GetMapping("/{id}")
    public IdNameProjection getProfessionById(@PathVariable Long id) {
        return professionService.getProfessionById(id);
    }

    @PostMapping
    public void createProfession(@Valid @RequestBody CreateProfessionRequest request) {
        professionService.createProfession(request);
    }

    @PatchMapping("/{id}")
    public void updateProfessionName(@Valid @RequestBody UpdateProfessionNameRequest request, @PathVariable Long id) {
        professionService.updateProfessionName(id, request);
    }
}
