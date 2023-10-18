package pl.piasta.bbiu.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Getter;
import lombok.NoArgsConstructor;
import pl.piasta.bbiu.domain.enumeration.Color;

import java.time.Instant;

import static jakarta.persistence.EnumType.STRING;
import static lombok.AccessLevel.PROTECTED;
import static pl.piasta.bbiu.domain.enumeration.Color.BLACK;

@Entity
@Table(name = "noughts")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class Nought {
    public static final int NAME_LENGTH = 30;
    public static final int COMMENT_LENGTH = 128;

    @Id
    @GeneratedValue
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false, length = NAME_LENGTH, updatable = false)
    private String name;

    @Column(nullable = false)
    @Default
    private double radius = 5.0;

    @Column(nullable = false)
    @Enumerated(STRING)
    @Default
    private Color color = BLACK;

    @Column(
            nullable = false, insertable = false, updatable = false,
            columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP"
    )
    @Default
    private Instant creationDate = Instant.now();

    @Column(length = COMMENT_LENGTH)
    private String comment;

    public void update(double radius, Color color, String comment) {
        this.radius = radius;
        this.color = color;
        this.comment = comment;
    }
}
