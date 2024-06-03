package dev.canverse.finance.api.features.company.services;

import dev.canverse.finance.api.exceptions.BadRequestException;
import dev.canverse.finance.api.features.company.dtos.CreateCompanyRequest;
import dev.canverse.finance.api.features.company.entities.Company;
import dev.canverse.finance.api.features.company.entities.CompanyBalance;
import dev.canverse.finance.api.features.company.repositories.CompanyRepository;
import lombok.RequiredArgsConstructor;
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
        company.setName(request.name());
        company.setAddress(request.address());
        company.setTaxOffice(request.taxOffice());
        company.setTaxRegistrationNumber(request.taxRegistrationNumber());

        var companyBalance = new CompanyBalance();
        companyBalance.setCompany(company);

        company.setBalance(companyBalance);

        companyRepository.save(company);
    }
}
