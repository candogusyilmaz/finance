package dev.canverse.finance.api.features.employee.entities;

import dev.canverse.finance.api.features.currency.entities.Currency;
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

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "employee_salaries")
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Salary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Employee employee;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal wage;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Currency currency;

    @AttributeOverrides({
            @AttributeOverride(name = "startDate", column = @Column(name = "start_date", nullable = false)),
            @AttributeOverride(name = "endDate", column = @Column(name = "end_date"))
    })
    private DatePeriod effectivePeriod;

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
