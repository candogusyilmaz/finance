package dev.canverse.finance.api.startup;

import dev.canverse.finance.api.features.user.entities.Role;
import dev.canverse.finance.api.features.user.entities.RolePermission;
import dev.canverse.finance.api.features.user.repositories.PermissionRepository;
import dev.canverse.finance.api.features.user.repositories.RolePermissionRepository;
import dev.canverse.finance.api.features.user.repositories.RoleRepository;
import dev.canverse.finance.api.startup.events.DefaultRolePermissionInitializeComplete;
import dev.canverse.finance.api.startup.events.PermissionInitializerComplete;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.ApplicationListener;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultRolePermissionInitializer implements ApplicationListener<PermissionInitializerComplete> {
    private static final String ADMIN_ROLE = "admin";

    private final PermissionRepository permissionRepository;
    private final RoleRepository roleRepository;
    private final RolePermissionRepository rolePermissionRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Override
    @Transactional
    public void onApplicationEvent(@NonNull PermissionInitializerComplete event) {
        var permissions = permissionRepository.findAll();
        var adminRole = getOrCreateRole(ADMIN_ROLE, Integer.MAX_VALUE);

        var adminPermissions = permissions.stream()
                .filter(s -> adminRole.getRolePermissions().stream().noneMatch(r -> r.getPermission().equals(s)))
                .map(s -> new RolePermission(adminRole, s))
                .toList();

        rolePermissionRepository.saveAllAndFlush(adminPermissions);
        log.info("Default roles and permissions initialized.");

        eventPublisher.publishEvent(new DefaultRolePermissionInitializeComplete(this));
    }

    private Role getOrCreateRole(String name, int level) {
        return roleRepository
                .findByName(name)
                .orElseGet(() -> roleRepository.save(new Role(name, level)));
    }
}
