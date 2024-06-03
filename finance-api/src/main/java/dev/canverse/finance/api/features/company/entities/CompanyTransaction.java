package dev.canverse.finance.api.features.company.entities;

import dev.canverse.finance.api.features.transaction.entities.Transaction;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "company_transactions")
@NoArgsConstructor
public class CompanyTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Company company;

    @OneToOne(optional = false)
    private Transaction transaction;
}
