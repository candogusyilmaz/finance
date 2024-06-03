package dev.canverse.finance.api.features.user.repositories;

import dev.canverse.finance.api.features.user.entities.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    @Query("select u from User u " +
            "left outer join u.userRoles ur " +
            "where u.username = :username and ur.timeperiod.startDate <= current_date and ur.timeperiod.endDate >= current_date")
    @EntityGraph(attributePaths = {"userRoles.role", "userRoles.role.rolePermissions.permission"})
    User findByUsernameIncludePermissions(String username);

    Optional<User> findByUsername(String username);
}
