package dev.canverse.finance.api;

import dev.canverse.finance.api.properties.CorsProperties;
import dev.canverse.finance.api.properties.JwtProperties;
import dev.canverse.finance.api.properties.RsaKeyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.envers.repository.config.EnableEnversRepositories;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.TimeZone;

import static org.springframework.data.web.config.EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO;

@SpringBootApplication
@EnableAsync
@EnableScheduling
@EnableEnversRepositories
@EnableSpringDataWebSupport(pageSerializationMode = VIA_DTO)
@EnableConfigurationProperties({RsaKeyProperties.class, CorsProperties.class, JwtProperties.class})
public class FinanceApi {

    public static void main(String[] args) {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
        SpringApplication.run(FinanceApi.class, args);
    }
}
