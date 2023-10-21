package pl.piasta.bbiu.domain.exception;

import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.CONFLICT;

sealed class UniquenessViolationException extends ResponseStatusException
        permits CrossNameUniquenessViolationException, NoughtNameUniquenessViolationException {
    UniquenessViolationException(String resource, String fieldName, String fieldValue) {
        super(CONFLICT, "%s with %s = %s already exists".formatted(resource, fieldName, fieldValue));
    }
}
