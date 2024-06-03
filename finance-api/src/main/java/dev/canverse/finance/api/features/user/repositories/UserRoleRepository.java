package dev.canverse.finance.api.features.user.repositories;

import dev.canverse.finance.api.features.user.entities.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Long>, JpaSpecificationExecutor<UserRole> {
    @Query("select count(ur) > 0 from UserRole ur where ur.user.id = :userId and ur.role.id = :roleId")
    boolean existsBy(long userId, long roleId);
}
