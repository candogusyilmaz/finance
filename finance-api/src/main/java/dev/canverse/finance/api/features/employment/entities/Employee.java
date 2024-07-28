package dev.canverse.finance.api.features.employment.entities;

import dev.canverse.finance.api.features.individual.entities.Individual;
import dev.canverse.finance.api.features.shared.embeddable.DatePeriod;
import dev.canverse.finance.api.features.shared.embeddable.Timestamp;
import dev.canverse.finance.api.features.user.entities.User;
import dev.canverse.finance.api.features.worksite.entities.WorksiteEmployee;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JoinFormula;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "employees")
@NoArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false, cascade = CascadeType.PERSIST)
    private Individual individual;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<EmployeeProfession> professions = new HashSet<>();

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("effectivePeriod.startDate DESC")
    private Set<EmployeeSalary> salaries = new HashSet<>();

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<WorksiteEmployee> worksites = new HashSet<>();

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinFormula("(SELECT ec.id FROM worksite_employees ec WHERE ec.employee_id = id and ec.start_date <= now() and (ec.end_date IS NULL OR now() <= ec.end_date) ORDER BY ec.id DESC LIMIT 1)")
    @Setter(AccessLevel.NONE)
    private WorksiteEmployee currentWorksite;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinFormula("(SELECT es.id FROM employee_salaries es WHERE es.employee_id = id and es.start_date <= now() and (es.end_date IS NULL OR now() <= es.end_date) ORDER BY es.id DESC LIMIT 1)")
    @Setter(AccessLevel.NONE)
    private EmployeeSalary currentSalary;

    @Setter(AccessLevel.NONE)
    private Timestamp timestamp;

    @CreatedBy
    @Setter(AccessLevel.NONE)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private User createdBy;
    
    @LastModifiedBy
    @Setter(AccessLevel.NONE)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private User updatedBy;
}
