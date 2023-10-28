package pl.piasta.bbiu.domain.service;

import pl.piasta.bbiu.domain.dto.CreateNoughtDto;
import pl.piasta.bbiu.domain.dto.UpdateNoughtDto;
import pl.piasta.bbiu.domain.projection.NoughtBasicProjection;
import pl.piasta.bbiu.domain.projection.NoughtProjection;

import java.util.List;

public interface NoughtsManager {
    NoughtProjection get(long id);

    List<NoughtBasicProjection> getAll();

    NoughtProjection create(CreateNoughtDto dto);

    NoughtProjection update(long id, UpdateNoughtDto dto);

    void delete(long id);
}
