package dev.canverse.finance.api.features.user.entities;

import dev.canverse.finance.api.features.shared.embeddable.DateTimePeriod;
import dev.canverse.finance.api.features.shared.embeddable.Timestamp;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Entity
@Table(name = "user_roles")
@NoArgsConstructor
public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private User user;

    @ManyToOne(optional = false)
    private Role role;

    @Setter
    private DateTimePeriod dateTimePeriod;

    private Timestamp timestamp;

    public UserRole(User user, Role role) {
        this.user = user;
        this.role = role;
    }
}
