package pl.piasta.bbiu.domain.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.piasta.bbiu.domain.dto.CreateNoughtDto;
import pl.piasta.bbiu.domain.dto.UpdateNoughtDto;
import pl.piasta.bbiu.domain.exception.NoughtNameUniquenessViolationException;
import pl.piasta.bbiu.domain.exception.NoughtNotFoundException;
import pl.piasta.bbiu.domain.query.NoughtBasicProjection;
import pl.piasta.bbiu.domain.query.NoughtProjection;
import pl.piasta.bbiu.model.Nought;
import pl.piasta.bbiu.repository.NoughtRepository;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
class NoughtsService implements NoughtsManager {
    private final NoughtRepository repository;

    @Override
    @Transactional(readOnly = true)
    public NoughtProjection get(long id) {
        return repository.findOneById(id).orElseThrow(() -> new NoughtNotFoundException(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<NoughtBasicProjection> getAll() {
        return repository.findAllByOrderByCreationDateDesc();
    }

    @Override
    public long create(CreateNoughtDto dto) {
        if (repository.existsByName(dto.name())) {
            throw new NoughtNameUniquenessViolationException(dto.name());
        }
        var nought = createNought(dto);
        return repository.save(nought).getId();
    }

    @Override
    public void update(long id, UpdateNoughtDto dto) {
        repository.findById(id).ifPresentOrElse(
                nought -> updateNought(nought, dto),
                () -> {throw new NoughtNotFoundException(id);}
        );
    }

    @Override
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
