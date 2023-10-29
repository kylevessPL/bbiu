package pl.piasta.bbiu.domain.exception;

import lombok.experimental.ExtensionMethod;
import pl.piasta.bbiu.util.DurationUtils;

import java.time.Duration;
import java.time.Instant;

@ExtensionMethod(DurationUtils.class)
sealed class ModificationLimitExceededException extends ConflictException
        permits NoughtModificationLimitExceededException {
    ModificationLimitExceededException(String resource, Instant lastModifiedDate, Duration rate) {
        super("%s modification limit exceeded. Only one modification is allowed per %s. Last modified date: %s."
                .formatted(resource, rate.prettyPrint(), lastModifiedDate)
        );
    }
}
