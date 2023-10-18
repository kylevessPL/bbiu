package pl.piasta.bbiu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import pl.piasta.bbiu.domain.query.CrossProjection;
import pl.piasta.bbiu.model.Cross;

import java.util.Optional;

public interface CrossRepository extends JpaRepository<Cross, Long>, JpaSpecificationExecutor<Cross> {
    Optional<CrossProjection> findOneById(Long id);

    Integer deleteOneById(Long id);
}
