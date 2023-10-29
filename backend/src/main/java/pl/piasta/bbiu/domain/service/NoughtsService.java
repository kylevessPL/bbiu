package pl.piasta.bbiu.domain.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.piasta.bbiu.domain.dto.CreateNoughtDto;
import pl.piasta.bbiu.domain.dto.UpdateNoughtDto;
import pl.piasta.bbiu.domain.exception.NoughtModificationLimitExceededException;
import pl.piasta.bbiu.domain.exception.NoughtNameUniquenessViolationException;
import pl.piasta.bbiu.domain.exception.NoughtNotFoundException;
import pl.piasta.bbiu.domain.projection.NoughtBasicProjection;
import pl.piasta.bbiu.domain.projection.NoughtProjection;
import pl.piasta.bbiu.model.Nought;
import pl.piasta.bbiu.repository.NoughtRepository;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

import static java.util.Objects.isNull;

@Service
@Transactional
@RequiredArgsConstructor
class NoughtsService implements NoughtsManager {
    private final Duration allowedModificationRate;
    private final NoughtRepository repository;
    private final ProjectionFactory projectionFactory;

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
    public NoughtProjection create(CreateNoughtDto dto) {
        if (repository.existsByName(dto.name())) {
            throw new NoughtNameUniquenessViolationException(dto.name());
        }
        var nought = createNought(dto);
        return project(repository.save(nought));
    }

    @Override
    public NoughtProjection update(long id, UpdateNoughtDto dto) {
        return repository.findById(id)
                .map(nought -> {
                    updateNought(nought, dto);
                    return project(nought);
                }).orElseThrow(() -> new NoughtNotFoundException(id));
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
        if (!canUpdate(nought)) {
            throw new NoughtModificationLimitExceededException(nought.getModificationDate(), allowedModificationRate);
        }
        nought.update(dto.radius(), dto.color(), dto.comment());
    }

    boolean canUpdate(Nought nought) {
        var lastModifiedDate = nought.getModificationDate();
        if (isNull(lastModifiedDate)) {
            return true;
        }
        var timeElapsed = Duration.between(lastModifiedDate, Instant.now());
        return timeElapsed.compareTo(allowedModificationRate) >= 0;
    }

    private NoughtProjection project(Nought nought) {
        return projectionFactory.createProjection(NoughtProjection.class, nought);
    }
}
