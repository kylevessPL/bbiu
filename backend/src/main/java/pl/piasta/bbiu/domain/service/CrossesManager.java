package pl.piasta.bbiu.domain.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import pl.piasta.bbiu.domain.dto.CreateCrossDto;
import pl.piasta.bbiu.domain.dto.UpdateCrossDto;
import pl.piasta.bbiu.domain.projection.CrossProjection;
import pl.piasta.bbiu.model.Cross;

public interface CrossesManager {
    CrossProjection get(long id);

    Page<CrossProjection> getAll(Specification<Cross> specification, Pageable pageable);

    CrossProjection create(CreateCrossDto dto);

    CrossProjection update(long id, UpdateCrossDto dto);

    void delete(long id);
}
