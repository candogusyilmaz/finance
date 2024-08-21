package dev.canverse.finance.api.features.payment.entities;

import dev.canverse.finance.api.features.shared.embeddable.Timestamp;
import dev.canverse.finance.api.features.user.entities.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;

@Getter
@Setter
@Entity
@Table(name = "payment_actions")
@NoArgsConstructor
public class PaymentAction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Payment payment;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Payment.Status status;

    @ManyToOne(optional = false)
    @CreatedBy
    private User createdBy;

    @ManyToOne(optional = false)
    @LastModifiedBy
    private User updatedBy;

    @Setter(lombok.AccessLevel.NONE)
    private Timestamp timestamp;

    public PaymentAction(Payment payment, Payment.Status status) {
        this.payment = payment;
        this.status = status;
    }
}
