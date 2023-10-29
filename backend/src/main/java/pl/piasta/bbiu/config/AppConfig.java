package pl.piasta.bbiu.config;

import net.kaczmarzyk.spring.data.jpa.web.SpecificationArgumentResolver;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.time.Duration;
import java.util.List;

@Configuration
@EntityScan("pl.piasta.bbiu.model")
@EnableJpaRepositories("pl.piasta.bbiu.repository")
@ConfigurationPropertiesScan("pl.piasta.bbiu.config")
class AppConfig implements WebMvcConfigurer {
    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(new SpecificationArgumentResolver());
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").combine(corsConfiguration());
    }

    @Bean
    @ConfigurationProperties("cors")
    CorsConfiguration corsConfiguration() {
        final CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.applyPermitDefaultValues();
        return corsConfiguration;
    }

    @Bean
    SpelAwareProxyProjectionFactory projectionFactory() {
        return new SpelAwareProxyProjectionFactory();
    }

    @Bean
    @Lazy
    Duration allowedResourceModificationRate(AppProperties properties) {
        return Duration.ofMinutes(properties.allowedResourceModificationRateMinutes());
    }
}
