package dev.canverse.finance.api.features.employee.entities;

import dev.canverse.finance.api.features.shared.embeddable.DateTimePeriod;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "employee_job_details")
@NoArgsConstructor
public class EmployeeJobDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Employee employee;

    @ManyToOne(optional = false)
    private Profession profession;

    private DateTimePeriod validityPeriod;

    private LocalDateTime socialSecurityStartDate;

    private LocalDateTime socialSecurityEndDate;

    private LocalDateTime workStartDate;

    private LocalDateTime workEndDate;

    private Double salary;
}
