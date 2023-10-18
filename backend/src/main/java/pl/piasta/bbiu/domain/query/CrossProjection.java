package pl.piasta.bbiu.domain.query;

import pl.piasta.bbiu.domain.enumeration.Material;

import java.time.Instant;

public record CrossProjection(
        Long id,
        String name,
        int angle,
        int weight,
        int beams,
        Material material,
        Instant creationDate,
        Instant expiryDate,
        String comment
) {}
