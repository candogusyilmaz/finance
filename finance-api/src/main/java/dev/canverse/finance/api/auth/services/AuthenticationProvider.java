package dev.canverse.finance.api.auth.services;

import dev.canverse.finance.api.features.user.entities.User;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Collections;
import java.util.Comparator;

public class AuthenticationProvider {
    private AuthenticationProvider() {
    }

    /**
     * Retrieves the authenticated user.
     *
     * @return A User object representing the authenticated user.
     */
    public static User getAuthentication() {
        var auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null)
            throw new AuthenticationCredentialsNotFoundException("No user is authenticated.");

        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    /**
     * Gets the highest level of the authenticated user based on their roles.
     *
     * @return The highest level among the user's roles or Integer.MIN_VALUE if no roles are present.
     */
    public static int getHighestLevel() {
        if (getAuthentication().getUserRoles().isEmpty())
            return Integer.MIN_VALUE;

        return Collections.max(getAuthentication().getUserRoles(), Comparator.comparing(s -> s.getRole().getLevel())).getRole().getLevel();
    }
}
