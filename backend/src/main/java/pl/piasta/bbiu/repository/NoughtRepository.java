package pl.piasta.bbiu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.piasta.bbiu.domain.query.NoughtProjection;
import pl.piasta.bbiu.model.Nought;

import java.util.List;
import java.util.Optional;

public interface NoughtRepository extends JpaRepository<Nought, Long> {
    Optional<NoughtProjection> findOneById(Long id);

    List<NoughtProjection> findAllBy();

    Integer deleteOneById(Long id);
}
