package pl.piasta.bbiu.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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
import pl.piasta.bbiu.common.CreatedResource;
import pl.piasta.bbiu.domain.dto.CreateNoughtDto;
import pl.piasta.bbiu.domain.dto.UpdateNoughtDto;
import pl.piasta.bbiu.domain.query.NoughtProjection;
import pl.piasta.bbiu.domain.service.NoughtsManager;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@RestController
@RequestMapping("/noughts")
@CrossOrigin
@RequiredArgsConstructor
class NoughtsController {
    private final NoughtsManager manager;

    @GetMapping
    public List<NoughtProjection> getAllNoughts() {
        return manager.getAll();
    }

    @PostMapping
    @ResponseStatus(CREATED)
    public CreatedResource createNought(@Valid @RequestBody CreateNoughtDto dto) {
        var id = manager.create(dto);
        return new CreatedResource(id);
    }

    @GetMapping("/{id}")
    public NoughtProjection getNought(@PathVariable long id) {
        return manager.get(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(NO_CONTENT)
    public void updateNought(@PathVariable long id, @Valid @RequestBody UpdateNoughtDto dto) {
        manager.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(NO_CONTENT)
    public void deleteNought(@PathVariable long id) {
        manager.delete(id);
    }
}
