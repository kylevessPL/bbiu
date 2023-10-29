package pl.piasta.bbiu.util;

import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.time.DurationFormatUtils;

import java.time.Duration;

@UtilityClass
public class DurationUtils {
    public String prettyPrint(Duration duration) {
        return DurationFormatUtils.formatDurationWords(
                duration.toMillis(),
                true,
                true
        );
    }
}
