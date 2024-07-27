package dev.canverse.finance.api.features.worksite.controllers;

import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import dev.canverse.finance.api.features.worksite.dtos.CreateWorksiteRequest;
import dev.canverse.finance.api.features.worksite.services.WorksiteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/worksites")
@RequiredArgsConstructor
public class WorksiteController {
    private final WorksiteService worksiteService;

    @GetMapping("/simple")
    public List<IdNameProjection> getWorksitesSimple() {
        return worksiteService.getWorksitesSimple();
    }

    @PostMapping
    public void createWorksite(@Valid @RequestBody CreateWorksiteRequest request) {
        worksiteService.createWorksite(request);
    }
}
