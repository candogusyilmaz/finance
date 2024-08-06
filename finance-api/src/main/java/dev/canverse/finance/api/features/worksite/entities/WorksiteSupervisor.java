package dev.canverse.finance.api.features.worksite.entities;

import dev.canverse.finance.api.features.employee.entities.Employee;
import dev.canverse.finance.api.features.shared.embeddable.DatePeriod;
import dev.canverse.finance.api.features.shared.embeddable.Timestamp;
import dev.canverse.finance.api.features.user.entities.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "worksite_supervisors")
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class WorksiteSupervisor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Worksite worksite;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Employee supervisor;

    @AttributeOverrides({
            @AttributeOverride(name = "startDate", column = @Column(name = "start_date", nullable = false)),
            @AttributeOverride(name = "endDate", column = @Column(name = "end_date"))
    })
    private DatePeriod period;

    @Setter(lombok.AccessLevel.NONE)
    private Timestamp timestamp;

    private String comment;

    @Column(nullable = false)
    private boolean active;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @CreatedBy
    private User createdBy;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @LastModifiedBy
    private User updatedBy;

    public WorksiteSupervisor(Worksite worksite, Employee supervisor, LocalDate startDate) {
        this.worksite = worksite;
        this.supervisor = supervisor;
        this.period = new DatePeriod(startDate, null);
        this.active = true;
    }
}
