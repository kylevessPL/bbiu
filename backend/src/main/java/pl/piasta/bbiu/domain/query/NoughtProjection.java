package pl.piasta.bbiu.domain.query;

import org.springframework.beans.factory.annotation.Value;
import pl.piasta.bbiu.domain.enumeration.Color;

import java.time.Instant;

public interface NoughtProjection {
    Long getId();

    String getName();

    @Value("#{T(pl.piasta.bbiu.common.NumberUtils).ceil(target.radius)}")
    double getRadius();

    Color getColor();

    Instant getCreationDate();

    String getComment();
}
