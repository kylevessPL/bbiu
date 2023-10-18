package pl.piasta.bbiu.domain.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.piasta.bbiu.domain.dto.CreateNoughtDto;
import pl.piasta.bbiu.domain.dto.UpdateNoughtDto;
import pl.piasta.bbiu.domain.exception.NoughtNotFoundException;
import pl.piasta.bbiu.domain.query.NoughtProjection;
import pl.piasta.bbiu.model.Nought;
import pl.piasta.bbiu.repository.NoughtRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
class NoughtsService implements NoughtsManager {
    private final NoughtRepository repository;

    @Override
    public NoughtProjection get(long id) {
        return repository.findOneById(id).orElseThrow(() -> new NoughtNotFoundException(id));
    }

    @Override
    public List<NoughtProjection> getAll() {
        return repository.findAllBy();
    }

    @Override
    @Transactional
    public long create(CreateNoughtDto dto) {
        var naught = createNought(dto);
        return repository.save(naught).getId();
    }

    @Override
    @Transactional
    public void update(long id, UpdateNoughtDto dto) {
        repository.findById(id).ifPresentOrElse(
                nought -> updateNought(nought, dto),
                () -> {throw new NoughtNotFoundException(id);}
        );
    }

    @Override
    @Transactional
    public void delete(long id) {
        if (repository.deleteOneById(id) == 0) {
            throw new NoughtNotFoundException(id);
        }
    }

    private Nought createNought(CreateNoughtDto dto) {
        return Nought.builder()
                .name(dto.name())
                .radius(dto.radius())
                .color(dto.color())
                .comment(dto.comment())
                .build();
    }

    private void updateNought(Nought nought, UpdateNoughtDto dto) {
        nought.update(dto.radius(), dto.color(), dto.comment());
    }
}
