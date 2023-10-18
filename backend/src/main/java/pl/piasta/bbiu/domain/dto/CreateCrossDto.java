package pl.piasta.bbiu.domain.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;
import pl.piasta.bbiu.domain.enumeration.Material;

import java.time.Instant;

import static pl.piasta.bbiu.model.Nought.COMMENT_LENGTH;
import static pl.piasta.bbiu.model.Nought.NAME_LENGTH;

public record CreateCrossDto(
        @NotBlank
        @Length(max = NAME_LENGTH)
        String name,
        @NotNull
        @Min(0)
        @Max(45)
        int angle,
        @NotNull
        @Min(1)
        @Max(10)
        int weight,
        @NotNull
        @Min(1)
        int beams,
        @NotNull
        Material material,
        Instant expiryDate,
        @Length(max = COMMENT_LENGTH)
        String comment
) {
}
