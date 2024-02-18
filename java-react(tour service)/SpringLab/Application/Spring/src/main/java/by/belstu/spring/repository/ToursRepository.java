package by.belstu.spring.repository;

import by.belstu.spring.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ToursRepository extends JpaRepository<Tour, Long> {
    Optional<Tour> findByName(String name);
}
