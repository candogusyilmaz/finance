package dev.canverse.finance.api.features.user.repositories;

import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import dev.canverse.finance.api.features.user.entities.Role;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends ExtendedJpaRepository<Role, Long> {
    @EntityGraph(attributePaths = "rolePermissions")
    Optional<Role> findByName(String name);
}
