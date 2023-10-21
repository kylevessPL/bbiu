package pl.piasta.bbiu.domain.exception;

import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

sealed class NotFoundException extends ResponseStatusException permits CrossNotFoundException, NoughtNotFoundException {
    NotFoundException(String resource, Long id) {
        super(NOT_FOUND, "%s with id = %d does not exist".formatted(resource, id));
    }
}
