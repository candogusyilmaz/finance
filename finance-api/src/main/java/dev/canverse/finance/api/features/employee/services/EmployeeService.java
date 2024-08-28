package dev.canverse.finance.api.features.employee.services;

import com.querydsl.core.group.GroupBy;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import dev.canverse.finance.api.exceptions.BadRequestException;
import dev.canverse.finance.api.exceptions.NotFoundException;
import dev.canverse.finance.api.features.currency.repositories.CurrencyRepository;
import dev.canverse.finance.api.features.employee.dtos.*;
import dev.canverse.finance.api.features.employee.entities.*;
import dev.canverse.finance.api.features.employee.mappers.EmployeeMapper;
import dev.canverse.finance.api.features.employee.repositories.EmployeeRepository;
import dev.canverse.finance.api.features.employee.repositories.ProfessionRepository;
import dev.canverse.finance.api.features.party.repositories.OrganizationRepository;
import dev.canverse.finance.api.features.payment.entities.QPayment;
import dev.canverse.finance.api.features.payment.entities.QPaymentAction;
import dev.canverse.finance.api.features.shared.dtos.AuditResponse;
import dev.canverse.finance.api.features.shared.embeddable.DatePeriod;
import dev.canverse.finance.api.features.shared.projections.IdNameProjection;
import dev.canverse.finance.api.features.worksite.repositories.WorksiteRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final JPAQueryFactory queryFactory;
    private final EmployeeRepository employeeRepository;
    private final ProfessionRepository professionRepository;
    private final CurrencyRepository currencyRepository;
    private final WorksiteRepository worksiteRepository;
    private final OrganizationRepository organizationRepository;

    @Transactional
    public void createEmployee(CreateEmployeeRequest request) {
        if (request.officialEmploymentStartDate().isBefore(request.employmentStartDate()))
            throw new BadRequestException("Resmi işe başlama tarihi, işe başlama tarihinden önce olamaz.");

        var employee = new Employee();
        employee.setSocialSecurityNumber(request.individual().socialSecurityNumber());
        employee.setName(request.individual().name());
        employee.setBirthDate(request.individual().birthDate());

        createEmployment(request, employee);
        createSalary(request, employee);

        request.worksiteId().ifPresent(id -> {
            var worksite = worksiteRepository.getReference(id, "Çalışma yeri bulunamadı.");
            employee.getAssignments().add(new EmployeeAssignment(worksite, employee, request.employmentStartDate()));
        });

        professionRepository.findAllById(request.professionIds()).stream()
                .map(profession -> new EmployeeProfession(employee, profession))
                .forEach(employee.getProfessions()::add);

        employeeRepository.save(employee);
    }

    private void createEmployment(CreateEmployeeRequest request, Employee employee) {
        var employment = new Employment();
        employment.setEmployee(employee);
        employment.setOrganization(organizationRepository.getReference(request.organizationId(), "Organizasyon bulunamadı."));
        employment.setFormalEmploymentPeriod(new DatePeriod(request.employmentStartDate(), null));
        employment.setActualEmploymentPeriod(new DatePeriod(request.officialEmploymentStartDate(), null));

        employee.getEmployments().add(employment);
    }

    private void createSalary(CreateEmployeeRequest request, Employee employee) {
        var salary = new Salary();
        salary.setWage(request.salary().amount());
        salary.setCurrency(currencyRepository.getReference(request.salary().currencyId(), "Para birimi bulunamadı."));
        salary.setEmployee(employee);
        salary.setEffectivePeriod(new DatePeriod(request.salary().startDate(), null));

        employee.getSalaries().add(salary);
    }

    public List<IdNameProjection> getEmployeesSimple() {
        return employeeRepository.findAllSimple();
    }

    public Page<GetEmployeesResponse> getEmployees(Pageable pageable) {
        return employeeRepository.findEmployees(pageable).map(EmployeeMapper.INSTANCE::toGetEmployeesResponse);
    }

    public GetEmployeeResponse getEmployee(Long id) {
        var emp = QEmployee.employee;
        var assignment = QEmployeeAssignment.employeeAssignment;
        var employment = QEmployment.employment;
        var profession = QEmployeeProfession.employeeProfession;

        var result = queryFactory.select(
                        emp.id, emp.socialSecurityNumber, emp.name, emp.birthDate,
                        assignment.worksite.id, assignment.worksite.name,
                        employment.organization.id, employment.organization.name, employment.formalEmploymentPeriod, employment.actualEmploymentPeriod,
                        profession.profession.id, profession.profession.name
                ).from(emp)
                .leftJoin(emp.assignments, assignment)
                .on(assignment.period.startDate.loe(LocalDate.now())
                        .and(assignment.period.endDate.goe(LocalDate.now()).or(assignment.period.endDate.isNull())))
                .leftJoin(emp.employments, employment)
                .on(employment.actualEmploymentPeriod.startDate.loe(LocalDate.now())
                        .and(employment.actualEmploymentPeriod.endDate.goe(LocalDate.now()).or(employment.actualEmploymentPeriod.endDate.isNull())))
                .leftJoin(emp.professions, profession)
                .where(emp.id.eq(id))
                .transform(GroupBy.groupBy(emp.id).as(
                        Projections.constructor(GetEmployeeResponse.class,
                                emp.id,
                                emp.socialSecurityNumber,
                                emp.name,
                                emp.birthDate,
                                Projections.constructor(GetEmployeeResponse.Worksite.class,
                                        assignment.worksite.id,
                                        assignment.worksite.name
                                ),
                                Projections.constructor(GetEmployeeResponse.Organization.class,
                                        employment.organization.id,
                                        employment.organization.name,
                                        employment.formalEmploymentPeriod,
                                        employment.actualEmploymentPeriod
                                ),
                                GroupBy.list(
                                        Projections.constructor(GetEmployeeResponse.Profession.class,
                                                profession.profession.id,
                                                profession.profession.name
                                        )
                                )
                        )
                ));

        if (result.isEmpty())
            throw new NotFoundException("Personel bulunamadı.", id);

        return result.get(id);
    }

    public List<GetEmployeeSalaryResponse> getEmployeeSalaries(Long employeeId) {
        var salary = QSalary.salary;

        return queryFactory.select(
                        Projections.constructor(GetEmployeeSalaryResponse.class,
                                salary.id,
                                salary.employee.id,
                                salary.wage,
                                Projections.constructor(GetEmployeeSalaryResponse.Currency.class,
                                        salary.currency.id,
                                        salary.currency.code
                                ),
                                salary.effectivePeriod,
                                Projections.constructor(AuditResponse.class,
                                        salary.createdBy.id,
                                        salary.createdBy.displayName,
                                        salary.timestamp.createdAt
                                ),
                                Projections.constructor(AuditResponse.class,
                                        salary.updatedBy.id,
                                        salary.updatedBy.displayName,
                                        salary.timestamp.updatedAt
                                )
                        )
                ).from(salary)
                .where(salary.employee.id.eq(employeeId))
                .fetch();
    }

    public List<GetEmployeeAssignmentResponse> getEmployeeAssignments(Long employeeId) {
        var assignment = QEmployeeAssignment.employeeAssignment;

        return queryFactory.select(
                        Projections.constructor(GetEmployeeAssignmentResponse.class,
                                assignment.id,
                                assignment.employee.id,
                                assignment.period,
                                Projections.constructor(GetEmployeeAssignmentResponse.Worksite.class,
                                        assignment.worksite.id,
                                        assignment.worksite.name
                                ),
                                Projections.constructor(AuditResponse.class,
                                        assignment.createdBy.id,
                                        assignment.createdBy.displayName,
                                        assignment.timestamp.createdAt
                                ),
                                Projections.constructor(AuditResponse.class,
                                        assignment.updatedBy.id,
                                        assignment.updatedBy.displayName,
                                        assignment.timestamp.updatedAt)
                        )
                ).from(assignment)
                .where(assignment.employee.id.eq(employeeId))
                .fetch();
    }

    public List<GetEmployeeEmploymentResponse> getEmployeeEmployments(Long employeeId) {
        var employment = QEmployment.employment;

        return queryFactory.select(
                        Projections.constructor(GetEmployeeEmploymentResponse.class,
                                employment.id,
                                employment.employee.id,
                                employment.formalEmploymentPeriod,
                                employment.actualEmploymentPeriod,
                                Projections.constructor(GetEmployeeEmploymentResponse.Organization.class,
                                        employment.organization.id,
                                        employment.organization.name
                                ),
                                Projections.constructor(AuditResponse.class,
                                        employment.createdBy.id,
                                        employment.createdBy.displayName,
                                        employment.timestamp.createdAt
                                ),
                                Projections.constructor(AuditResponse.class,
                                        employment.updatedBy.id,
                                        employment.updatedBy.displayName,
                                        employment.timestamp.updatedAt
                                )
                        )
                ).from(employment)
                .where(employment.employee.id.eq(employeeId))
                .fetch();
    }

    public List<GetEmployeePaymentResponse> getEmployeePayments(Long employeeId) {
        var payment = QPayment.payment;
        var status = QPaymentAction.paymentAction;

        return queryFactory.select(
                        Projections.constructor(GetEmployeePaymentResponse.class,
                                payment.id, payment.description, payment.money, payment.date,
                                Projections.constructor(GetEmployeePaymentResponse.LatestPaymentAction.class,
                                        status.id, status.status, Projections.constructor(AuditResponse.class,
                                                status.createdBy.id, status.createdBy.displayName, status.createdAt
                                        )
                                ),
                                Projections.constructor(GetEmployeePaymentResponse.PaymentCategory.class,
                                        payment.category.id, payment.category.name
                                ),
                                Projections.constructor(GetEmployeePaymentResponse.Party.class,
                                        payment.fromParty.id, payment.fromParty.name
                                ),
                                Projections.constructor(GetEmployeePaymentResponse.Party.class,
                                        payment.toParty.id, payment.toParty.name
                                ),
                                Projections.constructor(GetEmployeePaymentResponse.PaymentMethod.class,
                                        payment.method.id, payment.method.name
                                )
                        )
                ).from(payment)
                .innerJoin(status).on(status.id.eq(JPAExpressions.select(status.id.max())
                        .from(status)
                        .where(status.payment.id.eq(payment.id))))
                .where(payment.fromParty.id.eq(employeeId).or(payment.toParty.id.eq(employeeId)))
                .fetch();
    }
}
