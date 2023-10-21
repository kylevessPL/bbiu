package pl.piasta.bbiu.domain.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@ResponseStatus(NOT_FOUND)
sealed class NotFoundException extends RuntimeException permits CrossNotFoundException, NoughtNotFoundException {
    NotFoundException(String resource, Long id) {
        super("%s with id = %d does not exist".formatted(resource, id));
    }
}
