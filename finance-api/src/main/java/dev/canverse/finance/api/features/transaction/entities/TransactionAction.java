package dev.canverse.finance.api.features.transaction.entities;

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

    @ManyToOne(optional = false)
    @CreatedBy
    private User createdBy;

    @ManyToOne(optional = false)
    @LastModifiedBy
    private User updatedBy;

    private Timestamp timestamp;

    public TransactionAction(Transaction transaction, TransactionStatus status) {
        this.transaction = transaction;
        this.status = status;
    }
}
