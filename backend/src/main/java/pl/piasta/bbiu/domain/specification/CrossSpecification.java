package pl.piasta.bbiu.domain.specification;

import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.In;
import net.kaczmarzyk.spring.data.jpa.domain.LikeIgnoreCase;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.data.jpa.domain.Specification;
import pl.piasta.bbiu.model.Cross;

@And({
        @Spec(path = "id", spec = Equal.class),
        @Spec(path = "name", spec = LikeIgnoreCase.class),
        @Spec(path = "comment", spec = LikeIgnoreCase.class),
        @Spec(path = "angle", spec = Equal.class),
        @Spec(path = "weight", spec = Equal.class),
        @Spec(path = "beams", spec = Equal.class),
        @Spec(path = "material", paramSeparator = ',', spec = In.class)
})
public interface CrossSpecification extends Specification<Cross> {
}
