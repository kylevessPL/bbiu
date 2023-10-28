package pl.piasta.bbiu.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import pl.piasta.bbiu.domain.dto.CreateCrossDto;
import pl.piasta.bbiu.domain.dto.UpdateCrossDto;
import pl.piasta.bbiu.domain.projection.CrossProjection;
import pl.piasta.bbiu.domain.service.CrossesManager;
import pl.piasta.bbiu.domain.specification.CrossSpecification;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@RestController
@RequestMapping("/crosses")
@CrossOrigin
@RequiredArgsConstructor
class CrossesController {
    private final CrossesManager manager;

    @GetMapping
    public Page<CrossProjection> getAllCrosses(CrossSpecification specification, Pageable pageable) {
        return manager.getAll(specification, pageable);
    }

    @PostMapping
    @ResponseStatus(CREATED)
    public CrossProjection createCross(@Valid @RequestBody CreateCrossDto dto) {
        return manager.create(dto);
    }

    @GetMapping("/{id}")
    public CrossProjection getCross(@PathVariable long id) {
        return manager.get(id);
    }

    @PutMapping("/{id}")
    public CrossProjection updateCross(@PathVariable long id, @Valid @RequestBody UpdateCrossDto dto) {
        return manager.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(NO_CONTENT)
    public void deleteCross(@PathVariable long id) {
        manager.delete(id);
    }
}
