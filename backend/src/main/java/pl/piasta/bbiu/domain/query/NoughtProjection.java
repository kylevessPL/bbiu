package pl.piasta.bbiu.domain.query;

import org.springframework.beans.factory.annotation.Value;
import pl.piasta.bbiu.domain.enumeration.Color;

import java.time.Instant;

public record NoughtProjection(
        Long id,
        String name,
        @Value("#{target.angle.ceil()}")
        double radius,
        Color color,
        Instant creationDate,
        String comment
) {
}
