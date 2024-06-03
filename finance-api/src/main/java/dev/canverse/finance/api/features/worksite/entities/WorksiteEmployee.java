package dev.canverse.finance.api.features.worksite.entities;

import dev.canverse.finance.api.features.employee.entities.Employee;
import dev.canverse.finance.api.features.shared.embeddable.Timeperiod;
import dev.canverse.finance.api.features.shared.embeddable.Timestamp;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "worksite_employees")
@NoArgsConstructor
public class WorksiteEmployee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Worksite worksite;

    @ManyToOne(optional = false)
    private Employee employee;

    private Timeperiod period;

    private Timestamp timestamp;
}
