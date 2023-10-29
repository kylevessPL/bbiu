package pl.piasta.bbiu.config;

import jakarta.persistence.PreUpdate;
import pl.piasta.bbiu.model.ModificationTrackedEntity;

import java.time.Instant;

public class ModificationListener {
    @PreUpdate
    private void afterModified(ModificationTrackedEntity entity) {
        entity.setModificationDate(Instant.now());
    }
}
