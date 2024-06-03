package dev.canverse.finance.api.features.transaction.entities;

import dev.canverse.finance.api.features.user.entities.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedBy;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "transaction_actions")
@NoArgsConstructor
public class TransactionAction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Transaction transaction;

    @Column(nullable = false)
    private TransactionStatus status;

    @CreationTimestamp
    @Setter(AccessLevel.NONE)
    private LocalDateTime createdAt;

    @ManyToOne(optional = false)
    @CreatedBy
    private User createdBy;
}
