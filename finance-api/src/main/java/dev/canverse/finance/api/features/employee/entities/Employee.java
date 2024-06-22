package dev.canverse.finance.api.features.employee.entities;

import dev.canverse.finance.api.features.worksite.entities.WorksiteEmployee;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JoinFormula;

@Getter
@Setter
@Entity
@Table(name = "employees")
@NoArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 11)
    private String tckn;

    @Column(nullable = false)
    private String name;

    private String email;

    private String phoneNumber;

    @ManyToOne
    @JoinFormula("(SELECT ec.id FROM worksite_employees ec WHERE ec.employee_id = id and ec.start_date <= now() and now() <= ec.end_date ORDER BY ec.id DESC LIMIT 1)")
    private WorksiteEmployee worksite;

    @ManyToOne
    @JoinFormula("(SELECT ejd.id FROM employee_job_details ejd WHERE ejd.employee_id = id and ejd.start_date <= now() and now() <= ejd.end_date ORDER BY ejd.id DESC LIMIT 1)")
    private EmployeeJobDetail jobDetail;
}
