package pl.piasta.bbiu.domain.exception;

public final class CrossNotFoundException extends ResourceNotFoundException {
    public CrossNotFoundException(Long id) {
        super("Cross", id);
    }
}
