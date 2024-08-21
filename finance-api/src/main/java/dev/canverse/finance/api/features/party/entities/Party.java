package dev.canverse.finance.api.features.party.entities;

import dev.canverse.finance.api.features.payment.entities.Payment;
import dev.canverse.finance.api.features.shared.embeddable.Timestamp;
import dev.canverse.finance.api.features.user.entities.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "parties")
@Inheritance(strategy = InheritanceType.JOINED)
@EntityListeners(AuditingEntityListener.class)
public abstract class Party {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ElementCollection(targetClass = Role.class)
    @CollectionTable(name = "party_roles", joinColumns = @JoinColumn(name = "party_id"))
    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    @Setter(AccessLevel.NONE)
    private Set<Role> roles = new HashSet<>();

    @Setter(AccessLevel.NONE)
    @OneToMany(mappedBy = "fromParty", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Payment> outgoingPayments = new HashSet<>();

    @Setter(AccessLevel.NONE)
    @OneToMany(mappedBy = "toParty", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Payment> incomingPayments = new HashSet<>();

    @Setter(lombok.AccessLevel.NONE)
    private Timestamp timestamp;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @CreatedBy
    @Setter(AccessLevel.NONE)
    private User createdBy;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @LastModifiedBy
    @Setter(AccessLevel.NONE)
    private User updatedBy;

    public void addRole(Role role) {
        roles.add(role);
    }

    public void addRoles(Set<Role> roles) {
        this.roles.addAll(roles);
    }

    public enum Role {
        AFFILIATE,
        INDIVIDUAL,
        ORGANIZATION,
        SUPPLIER,
        EMPLOYEE,
        CUSTOMER
    }
}
