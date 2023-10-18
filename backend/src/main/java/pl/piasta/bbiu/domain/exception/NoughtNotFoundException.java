package pl.piasta.bbiu.domain.exception;

public class NoughtNotFoundException extends NotFoundException {
    public NoughtNotFoundException(Long id) {
        super("Nought with id: %d does not exist".formatted(id));
    }
}
