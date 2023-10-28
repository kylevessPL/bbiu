package pl.piasta.bbiu.domain.projection;

import java.time.Instant;

public interface NoughtBasicProjection {
    Long getId();

    String getName();

    Instant getCreationDate();
}
