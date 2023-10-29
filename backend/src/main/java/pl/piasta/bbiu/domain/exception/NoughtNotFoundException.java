package pl.piasta.bbiu.domain.exception;

public final class NoughtNotFoundException extends ResourceNotFoundException {
    public NoughtNotFoundException(Long id) {
        super("Nought", id);
    }
}
