package pl.piasta.bbiu.domain.exception;

import lombok.experimental.StandardException;
import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.CONFLICT;

@ResponseStatus(CONFLICT)
@StandardException
sealed class UniquenessViolationException extends RuntimeException
        permits CrossNameUniquenessViolationException, NoughtNameUniquenessViolationException {
    UniquenessViolationException(String resource, String fieldName, String fieldValue) {
        super("%s with %s = %s already exists".formatted(resource, fieldName, fieldValue));
    }
}
