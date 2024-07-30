package dev.canverse.finance.api.features.user.repositories;


import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import dev.canverse.finance.api.features.user.entities.RolePermission;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolePermissionRepository extends ExtendedJpaRepository<RolePermission, Long> {
    @Query("SELECT COUNT(rp) > 0 FROM RolePermission rp WHERE rp.role.id = :roleId AND rp.permission.id = :permissionId")
    boolean exists(int roleId, int permissionId);

    @Query("SELECT rp FROM RolePermission rp WHERE rp.role.id = :roleId AND rp.permission.id = :permissionId")
    Optional<RolePermission> findById(int roleId, int permissionId);
}