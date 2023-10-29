package pl.piasta.bbiu.model;

import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import pl.piasta.bbiu.config.ModificationListener;

import java.time.Instant;

@MappedSuperclass
@EntityListeners(ModificationListener.class)
public abstract class ModificationTrackedEntity {
    public abstract void setModificationDate(Instant modificationDate);
}
