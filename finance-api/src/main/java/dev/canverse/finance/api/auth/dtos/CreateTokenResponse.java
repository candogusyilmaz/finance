package dev.canverse.finance.api.auth.dtos;

import dev.canverse.finance.api.features.user.entities.User;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

public record CreateTokenResponse(
        String displayName,
        String title,
        String timezone,
        String token,
        List<String> permissions) {
    public static CreateTokenResponse from(User user, String token) {
        return new CreateTokenResponse(
                user.getDisplayName(),
                user.getTitle(),
                user.getTimezone(),
                token,
                user.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList()
        );
    }
}
