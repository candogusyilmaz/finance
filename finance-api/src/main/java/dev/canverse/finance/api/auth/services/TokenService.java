package dev.canverse.finance.api.auth.services;

import dev.canverse.finance.api.auth.dtos.CreateTokenResponse;
import dev.canverse.finance.api.features.user.entities.User;
import dev.canverse.finance.api.properties.JwtProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final JwtEncoder jwtEncoder;
    private final JwtDecoder jwtDecoder;
    private final JwtProperties jwtProperties;
    private final UserDetailsService userService;

    public User getSecurityUser(String refreshToken) {
        var jwt = jwtDecoder.decode(refreshToken);
        var username = jwt.getClaimAsString("sub");
        return (User) userService.loadUserByUsername(username);
    }

    public String createRefreshTokenCookie(User principal) {
        var now = Instant.now();
        var expiresAt = now.plus(jwtProperties.getRefreshTokenExpirationInSeconds(), ChronoUnit.SECONDS);

        var claims = JwtClaimsSet.builder()
                .issuer("finance-api")
                .issuedAt(now)
                .expiresAt(expiresAt)
                .subject(principal.getUsername())
                .build();

        var token = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

        return ResponseCookie.from("refresh-token", token)
                .path("/")
                .maxAge(jwtProperties.getRefreshTokenExpirationInSeconds())
                .httpOnly(true)
                .secure(true)
                .sameSite("none")
                .build()
                .toString();
    }

    public CreateTokenResponse createAccessToken(User principal) {
        var now = Instant.now();
        var expiresAt = now.plus(jwtProperties.getAccessTokenExpirationInSeconds(), ChronoUnit.SECONDS);

        var claims = JwtClaimsSet.builder()
                .issuer("finance-api")
                .issuedAt(now)
                .expiresAt(expiresAt)
                .subject(principal.getUsername())
                //.claim("timezone", principal.getTimezone())
                .build();

        var token = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
        return CreateTokenResponse.from(principal, token);
    }
}