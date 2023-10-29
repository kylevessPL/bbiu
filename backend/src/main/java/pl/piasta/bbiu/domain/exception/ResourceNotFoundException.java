package pl.piasta.bbiu.domain.exception;

sealed class ResourceNotFoundException extends NotFoundException
        permits CrossNotFoundException, NoughtNotFoundException {
    ResourceNotFoundException(String resource, Long id) {
        super("%s with id %d does not exist".formatted(resource, id));
    }
}
