package dev.canverse.finance.api.features.employee.repositories;

import com.querydsl.core.group.GroupBy;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import dev.canverse.finance.api.features.employee.dtos.*;
import dev.canverse.finance.api.features.employee.entities.*;
import dev.canverse.finance.api.features.party.entities.QOrganization;
import dev.canverse.finance.api.features.payment.entities.QPayment;
import dev.canverse.finance.api.features.payment.entities.QPaymentAction;
import dev.canverse.finance.api.features.shared.dtos.AuditResponse;
import dev.canverse.finance.api.features.worksite.entities.QWorksite;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class QueryDslEmployeeRepositoryImpl implements QueryDslEmployeeRepository {
    private final JPAQueryFactory queryFactory;

    public Page<GetEmployeesResponse> getEmployees(Pageable pageable) {
        QEmployee e = QEmployee.employee;
        QEmployeeAssignment ea = QEmployeeAssignment.employeeAssignment;
        QEmployment em = QEmployment.employment;
        QWorksite w = QWorksite.worksite;
        QOrganization o = QOrganization.organization;

        // Subquery for latest employee assignment
        var latestAssignmentSubquery = JPAExpressions
                .select(ea.id)
                .from(ea)
                .where(ea.employee.id.eq(e.id)
                        .and(ea.period.startDate.loe(LocalDate.now()))
                        .and(ea.period.endDate.isNull().or(ea.period.endDate.goe(LocalDate.now()))))
                .orderBy(ea.period.startDate.desc())
                .limit(1);

        // Subquery for current employment
        var currentEmploymentSubquery = JPAExpressions
                .select(em.id)
                .from(em)
                .where(em.employee.id.eq(e.id)
                        .and(em.actualEmploymentPeriod.startDate.loe(LocalDate.now()))
                        .and(em.actualEmploymentPeriod.endDate.isNull().or(em.actualEmploymentPeriod.endDate.goe(LocalDate.now()))))
                .orderBy(em.actualEmploymentPeriod.startDate.desc())
                .limit(1);

        // Main query
        var query = queryFactory
                .select(Projections.constructor(GetEmployeesResponse.class,
                        e.id,
                        e.socialSecurityNumber,
                        e.name,
                        Projections.constructor(GetEmployeesResponse.Worksite.class,
                                w.id,
                                w.name),
                        Projections.constructor(GetEmployeesResponse.Organization.class,
                                o.id,
                                o.name,
                                em.formalEmploymentPeriod,
                                em.actualEmploymentPeriod)))
                .from(e)
                .leftJoin(ea).on(ea.id.eq(latestAssignmentSubquery))
                .leftJoin(w).on(w.id.eq(ea.worksite.id))
                .leftJoin(em).on(em.id.eq(currentEmploymentSubquery))
                .leftJoin(o).on(o.id.eq(em.organization.id));


        // Execute paginated query
        var results = query
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        // Count query for pagination
        var countQuery = queryFactory
                .select(e.count())
                .from(e);

        return PageableExecutionUtils.getPage(results, pageable, countQuery::fetchOne);
    }

    public Optional<GetEmployeeResponse> getEmployee(Long id) {
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

        return Optional.of(result.get(id));
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
