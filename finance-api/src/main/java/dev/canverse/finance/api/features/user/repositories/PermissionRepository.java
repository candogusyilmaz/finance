package dev.canverse.finance.api.features.user.repositories;

import dev.canverse.finance.api.features.shared.repositories.ExtendedJpaRepository;
import dev.canverse.finance.api.features.user.entities.Permission;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionRepository extends ExtendedJpaRepository<Permission, Long> {

}