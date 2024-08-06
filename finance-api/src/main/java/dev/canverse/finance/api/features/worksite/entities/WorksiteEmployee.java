package dev.canverse.finance.api.features.worksite.entities;

import dev.canverse.finance.api.features.employee.entities.Employee;
import dev.canverse.finance.api.features.shared.embeddable.DatePeriod;
import dev.canverse.finance.api.features.shared.embeddable.Timestamp;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "worksite_employees")
@NoArgsConstructor
public class WorksiteEmployee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Worksite worksite;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Employee employee;

    @AttributeOverrides({
            @AttributeOverride(name = "startDate", column = @Column(name = "start_date", nullable = false)),
            @AttributeOverride(name = "endDate", column = @Column(name = "end_date"))
    })
    private DatePeriod period;

    @Setter(lombok.AccessLevel.NONE)
    private Timestamp timestamp;

    public WorksiteEmployee(Worksite worksite, Employee employee, LocalDate startDate) {
        this.worksite = worksite;
        this.employee = employee;
        this.period = new DatePeriod(startDate, null);
    }
}
