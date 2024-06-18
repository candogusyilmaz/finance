package dev.canverse.finance.api.features.company.controllers;

import dev.canverse.finance.api.features.company.dtos.CreateCompanyRequest;
import dev.canverse.finance.api.features.company.dtos.GetCompaniesResponse;
import dev.canverse.finance.api.features.company.repositories.projections.CompanyNameProjection;
import dev.canverse.finance.api.features.company.services.CompanyService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
public class CompanyController {
    private final CompanyService companyService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createCompany(@RequestBody CreateCompanyRequest request) {
        companyService.createCompany(request);
    }

    @GetMapping
    public Page<GetCompaniesResponse> getCompanies(@PageableDefault Pageable page) {
        return companyService.getCompanies(page);
    }

    @GetMapping("/search")
    public List<CompanyNameProjection> getCompaniesByName(@Valid @Size(min = 3) @NotBlank String name) {
        return companyService.getCompaniesByName(name);
    }

    @GetMapping("/simple")
    public List<CompanyNameProjection> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    @DeleteMapping("/{id}")
    public void deleteCompany(@PathVariable Long id) {
        companyService.deleteCompany(id);
    }
}
