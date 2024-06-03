package dev.canverse.finance.api.features.user.repositories;

import dev.canverse.finance.api.features.user.entities.Role;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long>, JpaSpecificationExecutor<Role> {
    @EntityGraph(attributePaths = "rolePermissions")
    Optional<Role> findByName(String name);
}
