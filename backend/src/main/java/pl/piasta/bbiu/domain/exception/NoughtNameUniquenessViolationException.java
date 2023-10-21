package pl.piasta.bbiu.domain.exception;

public final class NoughtNameUniquenessViolationException extends UniquenessViolationException {
    public NoughtNameUniquenessViolationException(String name) {
        super("Nought", "name", name);
    }
}
