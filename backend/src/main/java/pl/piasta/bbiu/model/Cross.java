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
import pl.piasta.bbiu.domain.enumeration.Material;

import java.time.Instant;

import static jakarta.persistence.EnumType.STRING;
import static lombok.AccessLevel.PROTECTED;
import static pl.piasta.bbiu.domain.enumeration.Material.WOOD;

@Entity
@Table(name = "crosses")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class Cross {
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
    private int angle = 0;

    @Column(nullable = false)
    @Default
    private int weight = 1;

    @Column(nullable = false)
    @Default
    private int beams = 4;

    @Column(nullable = false)
    @Enumerated(STRING)
    @Default
    private Material material = WOOD;

    @Column(
            nullable = false, insertable = false, updatable = false,
            columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP"
    )
    @Default
    private Instant creationDate = Instant.now();

    @Column
    private Instant expiryDate;

    @Column(length = COMMENT_LENGTH)
    private String comment;

    public void update(int angle, int weight, int beams, Material material, Instant expiryDate, String comment) {
        this.angle = angle;
        this.weight = weight;
        this.beams = beams;
        this.material = material;
        this.expiryDate = expiryDate;
        this.comment = comment;
    }
}
