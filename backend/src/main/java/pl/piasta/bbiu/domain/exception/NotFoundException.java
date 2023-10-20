package pl.piasta.bbiu.domain.exception;

import lombok.experimental.StandardException;
import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@ResponseStatus(NOT_FOUND)
@StandardException
sealed class NotFoundException extends RuntimeException permits CrossNotFoundException, NoughtNotFoundException {
}
