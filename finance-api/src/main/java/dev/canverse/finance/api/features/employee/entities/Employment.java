package dev.canverse.finance.api.features.employee.entities;


import dev.canverse.finance.api.features.party.entities.Organization;
import dev.canverse.finance.api.features.shared.embeddable.DatePeriod;
import dev.canverse.finance.api.features.shared.embeddable.Timestamp;
import dev.canverse.finance.api.features.user.entities.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@Entity
@Table(name = "employments")
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Employment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Employee employee;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Organization organization;

    @AttributeOverrides({
            @AttributeOverride(name = "startDate", column = @Column(name = "formal_employment_start_date")),
            @AttributeOverride(name = "endDate", column = @Column(name = "formal_employment_end_date"))
    })
    private DatePeriod formalEmploymentPeriod;

    @AttributeOverrides({
            @AttributeOverride(name = "startDate", column = @Column(name = "actual_employment_start_date")),
            @AttributeOverride(name = "endDate", column = @Column(name = "actual_employment_end_date"))
    })
    private DatePeriod actualEmploymentPeriod;

    @Setter(AccessLevel.NONE)
    private Timestamp timestamp;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @CreatedBy
    @Setter(AccessLevel.NONE)
    private User createdBy;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @LastModifiedBy
    @Setter(AccessLevel.NONE)
    private User updatedBy;
}
