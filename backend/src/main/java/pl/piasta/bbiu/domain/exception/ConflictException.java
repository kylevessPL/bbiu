package pl.piasta.bbiu.domain.exception;

import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.CONFLICT;

class ConflictException extends ResponseStatusException {
    ConflictException(String message) {
        super(CONFLICT, message);
    }
}
