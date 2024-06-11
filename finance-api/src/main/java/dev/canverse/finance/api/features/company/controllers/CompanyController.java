package dev.canverse.finance.api.features.company.controllers;

import dev.canverse.finance.api.features.company.dtos.CompanyResponse;
import dev.canverse.finance.api.features.company.dtos.CreateCompanyRequest;
import dev.canverse.finance.api.features.company.services.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
    public Page<CompanyResponse> getCompanies(@PageableDefault Pageable page) {
        return companyService.getCompanies(page);
    }
}
