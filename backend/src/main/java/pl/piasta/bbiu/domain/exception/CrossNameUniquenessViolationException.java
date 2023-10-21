package pl.piasta.bbiu.domain.exception;

public final class CrossNameUniquenessViolationException extends UniquenessViolationException {
    public CrossNameUniquenessViolationException(String name) {
        super("Cross", "name", name);
    }
}
