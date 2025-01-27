package dev.canverse.finance.api.config;

import dev.canverse.finance.api.auth.services.JwtAuthConverter;
import dev.canverse.finance.api.properties.CorsProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.oauth2.server.resource.web.access.BearerTokenAccessDeniedHandler;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(jsr250Enabled = true)
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final CorsProperties corsProperties;
    private final JwtAuthConverter jwtAuthConverter;

    @Bean
    public AuthenticationManager authenticationManager(UserDetailsService userService, PasswordEncoder passwordEncoder) {
        var authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userService);
        authProvider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(authProvider);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable);

        http.cors(Customizer.withDefaults());

        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                .requestMatchers("/actuator/**").permitAll()
                .requestMatchers("/api/auth/token").permitAll()
                .requestMatchers("/api/auth/refresh-token").permitAll()
                .anyRequest().authenticated());

        http.oauth2ResourceServer(config -> config.jwt(s -> s.jwtAuthenticationConverter(jwtAuthConverter)));

        http.exceptionHandling(handler -> handler
                .authenticationEntryPoint(new BearerTokenAuthenticationEntryPoint())
                .accessDeniedHandler(new BearerTokenAccessDeniedHandler()));

        http.sessionManagement(config -> config.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.httpBasic(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        var configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(corsProperties.getAllowedOrigins()));
        configuration.setAllowedHeaders(Arrays.asList(corsProperties.getAllowedHeaders()));
        configuration.setAllowedMethods(Arrays.asList(corsProperties.getAllowedMethods()));
        configuration.setAllowCredentials(true);
        configuration.setExposedHeaders(List.of("WWW-Authenticate"));

        var source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
