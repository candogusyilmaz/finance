package dev.canverse.finance.api.features.employment.entities;

import dev.canverse.finance.api.features.individual.entities.Individual;
import dev.canverse.finance.api.features.shared.embeddable.DatePeriod;
import dev.canverse.finance.api.features.shared.embeddable.Timestamp;
import dev.canverse.finance.api.features.worksite.entities.WorksiteEmployee;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JoinFormula;

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

    @ManyToOne
    @JoinFormula("(SELECT ec.id FROM worksite_employees ec WHERE ec.employee_id = id and ec.start_date <= now() and now() <= ec.end_date ORDER BY ec.id DESC LIMIT 1)")
    @Setter(AccessLevel.NONE)
    private WorksiteEmployee currentWorksite;

    @Setter(AccessLevel.NONE)
    private Timestamp timestamp;
}
