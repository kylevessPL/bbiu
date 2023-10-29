package pl.piasta.bbiu.domain.exception;

import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

class NotFoundException extends ResponseStatusException {
    NotFoundException(String reason) {
        super(NOT_FOUND, reason);
    }
}
