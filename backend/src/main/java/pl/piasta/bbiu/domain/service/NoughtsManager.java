package pl.piasta.bbiu.domain.service;

import pl.piasta.bbiu.domain.dto.CreateNoughtDto;
import pl.piasta.bbiu.domain.dto.UpdateNoughtDto;
import pl.piasta.bbiu.domain.query.NoughtBasicProjection;
import pl.piasta.bbiu.domain.query.NoughtProjection;

import java.util.List;

public interface NoughtsManager {
    NoughtProjection get(long id);

    List<NoughtBasicProjection> getAll();

    long create(CreateNoughtDto dto);

    void update(long id, UpdateNoughtDto dto);

    void delete(long id);
}
