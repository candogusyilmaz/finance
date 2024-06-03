package dev.canverse.finance.api.features.employee.entities;

import dev.canverse.finance.api.features.transaction.entities.Transaction;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "employee_salaries")
@NoArgsConstructor
public class EmployeeSalary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Employee employee;

    @ManyToOne(optional = false)
    private Transaction transaction;

    @Column(nullable = false)
    private LocalDateTime dueDate;
}
