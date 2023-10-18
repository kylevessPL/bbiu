package pl.piasta.bbiu.domain.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;
import pl.piasta.bbiu.domain.enumeration.Color;

import static pl.piasta.bbiu.model.Nought.COMMENT_LENGTH;

public record UpdateNoughtDto(
        @NotNull
        @DecimalMin("0.01")
        @Digits(integer = 2, fraction = 1)
        double radius,
        @NotNull
        Color color,
        @Length(max = COMMENT_LENGTH)
        String comment
) {
}
