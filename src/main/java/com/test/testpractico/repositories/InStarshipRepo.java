package com.test.testpractico.repositories;

import com.test.testpractico.models.Starship;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface InStarshipRepo extends JpaRepository<Starship,Long> {
    @Modifying
    @Query("DELETE FROM Starship s WHERE s.name = :name")
    void deleteByName(@Param("name") String name);
    @Query("SELECT s FROM Starship s WHERE s.name = :name")
    Starship findByName(String name);
    @Query("SELECT s FROM Starship s LEFT JOIN FETCH s.films")
    List<Starship> findAllFetch();
}
