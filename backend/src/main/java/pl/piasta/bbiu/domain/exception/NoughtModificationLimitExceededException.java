package pl.piasta.bbiu.domain.exception;

import java.time.Duration;
import java.time.Instant;

public final class NoughtModificationLimitExceededException extends ModificationLimitExceededException {
    public NoughtModificationLimitExceededException(Instant lastModifiedDate, Duration rate) {
        super("Nought", lastModifiedDate, rate);
    }
}
