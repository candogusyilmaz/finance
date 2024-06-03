package dev.canverse.finance.api.features.worksite.entities;

import dev.canverse.finance.api.features.employee.entities.Employee;
import dev.canverse.finance.api.features.shared.embeddable.Timeperiod;
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

    private Timeperiod timeperiod;

    private Timestamp timestamp;

    private String comment;

    @Column(nullable = false)
    private boolean active;

    @ManyToOne(optional = false)
    @CreatedBy
    private User createdBy;
}
