package dev.canverse.finance.api.features.employee.entities;

import dev.canverse.finance.api.features.party.entities.Individual;
import dev.canverse.finance.api.features.party.entities.Organization;
import dev.canverse.finance.api.features.shared.embeddable.DatePeriod;
import dev.canverse.finance.api.features.worksite.entities.WorksiteEmployee;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JoinFormula;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "employees")
public class Employee extends Individual {
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Organization organization;

    @AttributeOverrides({
            @AttributeOverride(name = "startDate", column = @Column(name = "official_employment_start_date")),
            @AttributeOverride(name = "endDate", column = @Column(name = "official_employment_end_date"))
    })
    private DatePeriod officialEmploymentPeriod;

    @AttributeOverrides({
            @AttributeOverride(name = "startDate", column = @Column(name = "employment_start_date")),
            @AttributeOverride(name = "endDate", column = @Column(name = "employment_end_date"))
    })
    private DatePeriod employmentPeriod;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<EmployeeProfession> professions = new HashSet<>();

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("effectivePeriod.startDate DESC")
    private Set<EmployeeSalary> salaries = new HashSet<>();

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<WorksiteEmployee> worksites = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinFormula("(SELECT ec.id FROM worksite_employees ec WHERE ec.employee_id = id and ec.start_date <= now() and (ec.end_date IS NULL OR now() <= ec.end_date) ORDER BY ec.id DESC LIMIT 1)")
    @Setter(AccessLevel.NONE)
    private WorksiteEmployee currentWorksite;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinFormula("(SELECT es.id FROM employee_salaries es WHERE es.employee_id = id and es.start_date <= now() and (es.end_date IS NULL OR now() <= es.end_date) ORDER BY es.id DESC LIMIT 1)")
    @Setter(AccessLevel.NONE)
    private EmployeeSalary currentSalary;

    public Employee() {
        this.addRole(Role.EMPLOYEE);
    }
}
