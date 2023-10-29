package pl.piasta.bbiu.domain.exception;

sealed class UniquenessViolationException extends ConflictException
        permits CrossNameUniquenessViolationException, NoughtNameUniquenessViolationException {
    UniquenessViolationException(String resource, String fieldName, String fieldValue) {
        super("%s with %s %s already exists".formatted(resource, fieldName, fieldValue));
    }
}
