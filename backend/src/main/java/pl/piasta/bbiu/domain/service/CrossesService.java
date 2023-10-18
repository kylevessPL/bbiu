package pl.piasta.bbiu.domain.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import pl.piasta.bbiu.domain.dto.CreateCrossDto;
import pl.piasta.bbiu.domain.dto.UpdateCrossDto;
import pl.piasta.bbiu.domain.exception.CrossNotFoundException;
import pl.piasta.bbiu.domain.query.CrossProjection;
import pl.piasta.bbiu.model.Cross;
import pl.piasta.bbiu.repository.CrossRepository;

@Service
@RequiredArgsConstructor
class CrossesService implements CrossesManager {
    private final CrossRepository repository;

    @Override
    public CrossProjection get(long id) {
        return repository.findOneById(id).orElseThrow(() -> new CrossNotFoundException(id));
    }

    @Override
    public Page<CrossProjection> getAll(Specification<Cross> specification, Pageable pageable) {
        return repository.findAllBy(specification, pageable);
    }

    @Override
    public long create(CreateCrossDto dto) {
        var cross = createCross(dto);
        return repository.save(cross).getId();
    }

    @Override
    public void update(long id, UpdateCrossDto dto) {
        repository.findById(id).ifPresentOrElse(
                cross -> updateCross(cross, dto),
                () -> {throw new CrossNotFoundException(id);}
        );
    }

    @Override
    public void delete(long id) {
        if (repository.deleteOneById(id)) {
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
}
