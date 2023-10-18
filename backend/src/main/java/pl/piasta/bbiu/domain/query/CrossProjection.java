package pl.piasta.bbiu.domain.query;

import pl.piasta.bbiu.domain.enumeration.Material;

import java.time.Instant;

public interface CrossProjection {
    Long getId();

    String getName();

    int getAngle();

    int getWeight();

    int getBeams();

    Material getMaterial();

    Instant getCreationDate();

    Instant getExpiryDate();

    String getComment();
}
