package dev.canverse.finance.api.auth.services;

import dev.canverse.finance.api.features.user.entities.User;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@EnableJpaAuditing
public class AuditorProvider implements AuditorAware<User> {
    @Override
    @NonNull
    public Optional<User> getCurrentAuditor() {
        return Optional.of(AuthenticationProvider.getAuthentication());
    }
}
