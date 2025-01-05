package dev.canverse.finance.api.features.employee.entities;

import dev.canverse.finance.api.features.party.entities.Individual;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
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

    protected Employee() {
    }

    public Employee(String firstname, String lastname, String socialSecurityNumber, LocalDate birthDate) {
        super(firstname, lastname, socialSecurityNumber, birthDate);
        super.addRole(Role.EMPLOYEE);
    }
}
