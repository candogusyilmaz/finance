package dev.canverse.finance.api.features.employment.entities;

import dev.canverse.finance.api.features.shared.embeddable.Timestamp;
import dev.canverse.finance.api.features.user.entities.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "payrolls")
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Payroll {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Employee employee;

    @Column(nullable = false, precision = 15, scale = 2)
    @Setter(lombok.AccessLevel.NONE)
    private BigDecimal grossSalary;

    @Column(nullable = false, precision = 15, scale = 2)
    @Setter(lombok.AccessLevel.NONE)
    private BigDecimal additionalPayments;

    @Column(nullable = false, precision = 15, scale = 2)
    @Setter(lombok.AccessLevel.NONE)
    private BigDecimal deductions;

    @Column(nullable = false, precision = 15, scale = 2)
    @Setter(lombok.AccessLevel.NONE)
    private BigDecimal netSalary;

    @Column(nullable = false)
    private LocalDate paymentDate;

    @Setter(lombok.AccessLevel.NONE)
    private Timestamp timestamp;

    @ManyToOne
    @CreatedBy
    @Setter(lombok.AccessLevel.NONE)
    private User createdBy;

    @ManyToOne
    @LastModifiedBy
    @Setter(lombok.AccessLevel.NONE)
    private User updatedBy;

    public void setPayments(BigDecimal grossSalary, BigDecimal additionalPayments, BigDecimal deductions) {
        this.grossSalary = grossSalary;
        this.additionalPayments = additionalPayments;
        this.deductions = deductions;
        this.netSalary = grossSalary.add(additionalPayments).subtract(deductions);
    }
}
