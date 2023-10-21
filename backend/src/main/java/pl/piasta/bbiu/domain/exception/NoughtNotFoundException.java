package pl.piasta.bbiu.domain.exception;

public final class NoughtNotFoundException extends NotFoundException {
    public NoughtNotFoundException(Long id) {
        super("Nought", id);
    }
}
