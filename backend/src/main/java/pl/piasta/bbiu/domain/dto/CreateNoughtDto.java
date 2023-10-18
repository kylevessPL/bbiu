package pl.piasta.bbiu.domain.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;
import pl.piasta.bbiu.domain.enumeration.Color;

import static pl.piasta.bbiu.model.Nought.COMMENT_LENGTH;
import static pl.piasta.bbiu.model.Nought.NAME_LENGTH;

public record CreateNoughtDto(
        @NotBlank
        @Length(max = NAME_LENGTH)
        String name,
        @NotNull
        @DecimalMin("0.1")
        @Digits(integer = 2, fraction = 1)
        double radius,
        @NotNull
        Color color,
        @Length(max = COMMENT_LENGTH)
        String comment
) {
}
