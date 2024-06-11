package dev.canverse.finance.api.features.company.services;

import dev.canverse.finance.api.exceptions.BadRequestException;
import dev.canverse.finance.api.features.company.dtos.CompanyResponse;
import dev.canverse.finance.api.features.company.dtos.CreateCompanyRequest;
import dev.canverse.finance.api.features.company.entities.Company;
import dev.canverse.finance.api.features.company.repositories.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyRepository companyRepository;

    public void createCompany(CreateCompanyRequest request) {
        if (companyRepository.existsByName(request.name())) {
            throw new BadRequestException("Firma ismi zaten kullanımda.");
        }

        var company = new Company();
        company.setName(StringUtils.normalizeSpace(request.name()));
        company.setAddress(StringUtils.normalizeSpace(request.address()));
        company.setTaxOffice(StringUtils.normalizeSpace(request.taxOffice()));
        company.setTaxRegistrationNumber(StringUtils.normalizeSpace(request.taxRegistrationNumber()));
        company.setPhoneNumber(StringUtils.normalizeSpace(request.phoneNumber()));
        company.setEmail(StringUtils.normalizeSpace(request.email()));

        companyRepository.save(company);
    }

    public Page<CompanyResponse> getCompanies(Pageable page) {
        return companyRepository
                .findAll(page)
                .map(CompanyResponse::from);
    }
}
