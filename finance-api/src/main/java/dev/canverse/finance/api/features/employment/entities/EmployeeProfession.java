package dev.canverse.finance.api.features.employment.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(
        name = "employee_professions",
        uniqueConstraints = @UniqueConstraint(columnNames = {"employee_id", "profession_id"})
)
@NoArgsConstructor
public class EmployeeProfession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Employee employee;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Profession profession;

    public EmployeeProfession(Employee employee, Profession profession) {
        this.employee = employee;
        this.profession = profession;
    }
}
