```xml

<dependencies>
    <dependency>
        <groupId>com.blazebit</groupId>
        <artifactId>blaze-persistence-core-api-jakarta</artifactId>
        <version>${blaze-persistence.version}</version>
        <scope>compile</scope>
    </dependency>
    <dependency>
        <groupId>com.blazebit</groupId>
        <artifactId>blaze-persistence-core-impl-jakarta</artifactId>
        <version>${blaze-persistence.version}</version>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>com.blazebit</groupId>
        <artifactId>blaze-persistence-integration-hibernate-6.2</artifactId>
        <version>${blaze-persistence.version}</version>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>com.blazebit</groupId>
        <artifactId>blaze-persistence-entity-view-api-jakarta</artifactId>
        <version>${blaze-persistence.version}</version>
        <scope>compile</scope>
    </dependency>
    <dependency>
        <groupId>com.blazebit</groupId>
        <artifactId>blaze-persistence-entity-view-impl-jakarta</artifactId>
        <version>${blaze-persistence.version}</version>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>com.blazebit</groupId>
        <artifactId>blaze-persistence-entity-view-processor-jakarta</artifactId>
        <version>${blaze-persistence.version}</version>
        <scope>provided</scope>
    </dependency>
    <dependency>
        <groupId>com.blazebit</groupId>
        <artifactId>blaze-persistence-integration-spring-data-3.3</artifactId>
        <version>${blaze-persistence.version}</version>
        <scope>compile</scope>
    </dependency>
    <dependency>
        <groupId>com.blazebit</groupId>
        <artifactId>blaze-persistence-jpa-criteria-api-jakarta</artifactId>
        <version>${blaze-persistence.version}</version>
        <scope>compile</scope>
    </dependency>
    <dependency>
        <groupId>com.blazebit</groupId>
        <artifactId>blaze-persistence-jpa-criteria-impl-jakarta</artifactId>
        <version>${blaze-persistence.version}</version>
        <scope>runtime</scope>
    </dependency>
</dependencies>
```

```java
package dev.canverse.finance.api.config;

import com.blazebit.persistence.Criteria;
import com.blazebit.persistence.CriteriaBuilderFactory;
import com.blazebit.persistence.spring.data.repository.config.EnableBlazeRepositories;
import com.blazebit.persistence.view.EntityViewManager;
import com.blazebit.persistence.view.spi.EntityViewConfiguration;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnit;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Scope;

@Configuration
@EnableBlazeRepositories(basePackages = "dev.canverse.finance.api.features.**.blaze")
public class BlazePersistenceConfiguration {

    @PersistenceUnit
    private EntityManagerFactory entityManagerFactory;

    @Bean
    @Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
    @Lazy(false)
    public CriteriaBuilderFactory createCriteriaBuilderFactory() {
        var config = Criteria.getDefault();
        return config.createCriteriaBuilderFactory(entityManagerFactory);
    }

    @Bean
    @Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
    @Lazy(false)
    public EntityViewManager createEntityViewManager(CriteriaBuilderFactory cbf, EntityViewConfiguration entityViewConfiguration) {
        return entityViewConfiguration.createEntityViewManager(cbf);
    }
}
```