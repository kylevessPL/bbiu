package pl.piasta.bbiu.domain.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.piasta.bbiu.domain.dto.CreateCrossDto;
import pl.piasta.bbiu.domain.dto.UpdateCrossDto;
import pl.piasta.bbiu.domain.exception.CrossNameUniquenessViolationException;
import pl.piasta.bbiu.domain.exception.CrossNotFoundException;
import pl.piasta.bbiu.domain.projection.CrossProjection;
import pl.piasta.bbiu.model.Cross;
import pl.piasta.bbiu.repository.CrossRepository;

@Service
@Transactional
@RequiredArgsConstructor
class CrossesService implements CrossesManager {
    private final CrossRepository repository;
    private final ProjectionFactory projectionFactory;

    @Override
    @Transactional(readOnly = true)
    public CrossProjection get(long id) {
        return repository.findOneById(id).orElseThrow(() -> new CrossNotFoundException(id));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CrossProjection> getAll(Specification<Cross> specification, Pageable pageable) {
        return repository.findAll(specification, pageable).map(this::project);
    }

    @Override
    public CrossProjection create(CreateCrossDto dto) {
        if (repository.existsByName(dto.name())) {
            throw new CrossNameUniquenessViolationException(dto.name());
        }
        var cross = createCross(dto);
        return project(repository.save(cross));
    }

    @Override
    public CrossProjection update(long id, UpdateCrossDto dto) {
        return repository.findById(id)
                .map(cross -> {
                    updateCross(cross, dto);
                    return project(cross);
                }).orElseThrow(() -> new CrossNotFoundException(id));
    }

    @Override
    public void delete(long id) {
        if (repository.deleteOneById(id) == 0) {
            throw new CrossNotFoundException(id);
        }
    }

    private Cross createCross(CreateCrossDto dto) {
        return Cross.builder()
                .name(dto.name())
                .angle(dto.angle())
                .weight(dto.weight())
                .beams(dto.beams())
                .material(dto.material())
                .expiryDate(dto.expiryDate())
                .comment(dto.comment())
                .build();
    }

    private void updateCross(Cross cross, UpdateCrossDto dto) {
        cross.update(dto.angle(), dto.weight(), dto.beams(), dto.material(), dto.expiryDate(), dto.comment());
    }

    private CrossProjection project(Cross cross) {
        return projectionFactory.createProjection(CrossProjection.class, cross);
    }
}
