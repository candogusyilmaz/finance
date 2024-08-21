package dev.canverse.finance.api.features.employee.entities;

import dev.canverse.finance.api.features.party.entities.Individual;
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
    @Setter(AccessLevel.NONE)
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Employment> employments = new HashSet<>();

    @Setter(AccessLevel.NONE)
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<EmployeeProfession> professions = new HashSet<>();

    @Setter(AccessLevel.NONE)
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Salary> salaries = new HashSet<>();

    @Setter(AccessLevel.NONE)
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<EmployeeAssignment> assignments = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinFormula("(SELECT ec.id FROM employee_assignments ec WHERE ec.employee_id = id and ec.start_date <= now() and (ec.end_date IS NULL OR now() <= ec.end_date) ORDER BY ec.id DESC LIMIT 1)")
    @Setter(AccessLevel.NONE)
    private EmployeeAssignment currentWorksite;

    public Employee() {
        this.addRole(Role.EMPLOYEE);
    }
}
