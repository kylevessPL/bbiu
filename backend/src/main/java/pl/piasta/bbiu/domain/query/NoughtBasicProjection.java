package pl.piasta.bbiu.domain.query;

import java.time.Instant;

public interface NoughtBasicProjection {
    Long getId();

    String getName();

    Instant getCreationDate();
}
