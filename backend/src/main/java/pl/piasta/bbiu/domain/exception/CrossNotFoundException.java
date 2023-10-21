package pl.piasta.bbiu.domain.exception;

public final class CrossNotFoundException extends NotFoundException {
    public CrossNotFoundException(Long id) {
        super("Cross", id);
    }
}
