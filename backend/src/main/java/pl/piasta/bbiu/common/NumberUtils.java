package pl.piasta.bbiu.common;

import lombok.experimental.UtilityClass;

import java.math.BigDecimal;

import static java.math.RoundingMode.CEILING;

@UtilityClass
public class NumberUtils {
    private final int DOUBLE_PRECISION_DEFAULT = 2;

    public double ceil(double value) {
        return ceil(value, DOUBLE_PRECISION_DEFAULT);
    }

    public double ceil(double value, Integer scale) {
        return BigDecimal.valueOf(value)
                .setScale(scale, CEILING)
                .doubleValue();
    }
}
