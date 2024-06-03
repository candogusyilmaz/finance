package dev.canverse.finance.api.features.user.entities;

import dev.canverse.finance.api.auth.services.AuthenticationProvider;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.Serializable;

@Getter
@Entity
@Table(name = "role_permissions")
@NoArgsConstructor
public class RolePermission implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Role role;

    @ManyToOne(optional = false)
    private Permission permission;

    public RolePermission(Role role, Permission permission) {
        this.role = role;
        this.permission = permission;
    }

    @PrePersist
    @PreUpdate
    @PreRemove
    private void beforeSave() {
        if (SecurityContextHolder.getContext().getAuthentication() == null)
            return;

        if (AuthenticationProvider.getHighestLevel() < role.getLevel())
            throw new SecurityException("You cannot create/update/remove a role higher or equal to your level.");
    }
}
