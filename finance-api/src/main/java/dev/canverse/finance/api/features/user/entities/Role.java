package dev.canverse.finance.api.features.user.entities;

import dev.canverse.finance.api.auth.services.AuthenticationProvider;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "roles")
@NoArgsConstructor
public class Role implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, updatable = false)
    private String name;

    @Column(nullable = false)
    private int level;

    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<RolePermission> rolePermissions = new HashSet<>();

    public Role(String name, int level) {
        this.name = name;
        this.level = level;
    }

    @PrePersist
    @PreUpdate
    @PreRemove
    private void beforeSave() {
        if (SecurityContextHolder.getContext().getAuthentication() == null)
            return;

        if (AuthenticationProvider.getHighestLevel() < level)
            throw new SecurityException("You cannot create/update/remove a role higher or equal to your level.");
    }
}
