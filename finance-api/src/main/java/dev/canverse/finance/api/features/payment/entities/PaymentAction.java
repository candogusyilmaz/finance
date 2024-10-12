package dev.canverse.finance.api.features.payment.entities;

import dev.canverse.finance.api.features.user.entities.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedBy;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "payment_actions")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PaymentAction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Payment payment;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Payment.Status status;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @CreatedBy
    private User createdBy;

    @Column(nullable = false)
    @CreationTimestamp
    @ColumnDefault("CURRENT_TIMESTAMP")
    @Setter(AccessLevel.NONE)
    private LocalDateTime createdAt;

    public PaymentAction(Payment payment, Payment.Status status) {
        this.payment = payment;
        this.status = status;
    }
}
