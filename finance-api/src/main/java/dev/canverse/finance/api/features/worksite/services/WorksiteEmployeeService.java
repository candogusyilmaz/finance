package dev.canverse.finance.api.features.worksite.services;

import dev.canverse.finance.api.exceptions.BadRequestException;
import dev.canverse.finance.api.exceptions.NotFoundException;
import dev.canverse.finance.api.features.employee.repositories.EmployeeRepository;
import dev.canverse.finance.api.features.shared.embeddable.DateTimePeriod;
import dev.canverse.finance.api.features.worksite.dtos.CreateWorksiteEmployeeRequest;
import dev.canverse.finance.api.features.worksite.entities.WorksiteEmployee;
import dev.canverse.finance.api.features.worksite.repositories.WorksiteEmployeeRepository;
import dev.canverse.finance.api.features.worksite.repositories.WorksiteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WorksiteEmployeeService {
    private final WorksiteEmployeeRepository worksiteEmployeeRepository;
    private final WorksiteRepository worksiteRepository;
    private final EmployeeRepository employeeRepository;

    public void createWorksiteEmployee(CreateWorksiteEmployeeRequest request) {
        var worksite = worksiteRepository.findById(request.worksiteId()).orElseThrow(() -> new NotFoundException("Santiye bulunamadi."));
        var employee = employeeRepository.findById(request.employeeId()).orElseThrow(() -> new NotFoundException("Personel bulunamadi."));

        if (worksiteEmployeeRepository.existsWithinPeriod(worksite.getId(), employee.getId(), request.startDate(), request.endDate())) {
            throw new BadRequestException("Personel bu tarih araliginda zaten bu santiyede calisiyor.");
        }

        var worksiteEmployee = new WorksiteEmployee();
        worksiteEmployee.setWorksite(worksite);
        worksiteEmployee.setEmployee(employee);
        worksiteEmployee.setPeriod(new DateTimePeriod(request.startDate(), request.endDate()));

        worksiteEmployeeRepository.save(worksiteEmployee);
    }
}
