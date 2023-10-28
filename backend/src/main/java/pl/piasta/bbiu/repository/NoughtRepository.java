package pl.piasta.bbiu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.piasta.bbiu.domain.projection.NoughtBasicProjection;
import pl.piasta.bbiu.domain.projection.NoughtProjection;
import pl.piasta.bbiu.model.Nought;

import java.util.List;
import java.util.Optional;

public interface NoughtRepository extends JpaRepository<Nought, Long> {
    boolean existsByName(String name);

    Optional<NoughtProjection> findOneById(Long id);

    List<NoughtBasicProjection> findAllByOrderByCreationDateDesc();

    Integer deleteOneById(Long id);
}
