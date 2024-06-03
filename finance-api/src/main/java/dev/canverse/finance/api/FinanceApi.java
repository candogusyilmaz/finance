package dev.canverse.finance.api;

import dev.canverse.finance.api.properties.CorsProperties;
import dev.canverse.finance.api.properties.JwtProperties;
import dev.canverse.finance.api.properties.RsaKeyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableAsync
@EnableScheduling
@EnableConfigurationProperties({RsaKeyProperties.class, CorsProperties.class, JwtProperties.class})
public class FinanceApi {

    public static void main(String[] args) {
        SpringApplication.run(FinanceApi.class, args);
    }

}
