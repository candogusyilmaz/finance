package dev.canverse.finance.api.features.worksite.entities;

import dev.canverse.finance.api.features.employment.entities.Employee;
import dev.canverse.finance.api.features.shared.embeddable.DatePeriod;
import dev.canverse.finance.api.features.shared.embeddable.Timestamp;
import dev.canverse.finance.api.features.user.entities.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;

@Getter
@Setter
@Entity
@Table(name = "worksite_supervisors")
@NoArgsConstructor
public class WorksiteSupervisor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Worksite worksite;

    @ManyToOne(optional = false)
    private Employee supervisor;

    @AttributeOverrides({
            @AttributeOverride(name = "endDate", column = @Column())
    })
    private DatePeriod effectivePeriod;

    private Timestamp timestamp;

    private String comment;

    @Column(nullable = false)
    private boolean active;

    @ManyToOne(optional = false)
    @CreatedBy
    private User createdBy;
}
