package com.test.testpractico.repositories;

import com.test.testpractico.models.Planet;
import com.test.testpractico.models.Starship;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface InPlanetsRepo extends JpaRepository<Planet,Long> {
    @Modifying
    @Query("DELETE FROM Planet p WHERE p.name = :name")
    void deleteByName(@Param("name") String name);

    @Query("SELECT s FROM Starship s WHERE s.name = :name")
    Starship findByName(String name);
}
