package pl.piasta.bbiu.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("app")
public record AppProperties(Long allowedResourceModificationRateMinutes) {
}
