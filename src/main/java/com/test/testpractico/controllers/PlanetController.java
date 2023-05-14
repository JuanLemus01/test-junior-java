package com.test.testpractico.controllers;

import com.test.testpractico.models.Planet;
import com.test.testpractico.models.Starship;
import com.test.testpractico.services.PlanetService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class PlanetController {

    private PlanetService planetService;

    public PlanetController(PlanetService planetService) {
        this.planetService = planetService;
    }

    @GetMapping("/planet/{terrainFind}")
    public Planet getPlanets(@PathVariable String terrainFind){
        Planet planets = planetService.getPlanet(terrainFind);
        if (planets == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Recurso no encontrado");
        }
        return planets;
    }
}
