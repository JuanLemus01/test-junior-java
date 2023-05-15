package com.test.testpractico.controllers;

import com.test.testpractico.models.Planet;
import com.test.testpractico.services.PlanetService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

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
        planetService.addPlanet(planets);
        return planets;
    }
    @GetMapping("/listplanets")
    @ResponseStatus(HttpStatus.OK)
    public List<Planet> getAllplanets(){
        return planetService.getAllplanets();
    }
    @GetMapping("/planetidlist/{name}")
    @ResponseStatus(HttpStatus.OK)
    public Planet getPlanetByName(@PathVariable String name) {
        return planetService.getPlanetByName(name);
    }
    @DeleteMapping("/deletplanet/{name}")
    @ResponseStatus(HttpStatus.OK)
    public void deletePlanet(@PathVariable String name) {
        planetService.deletePlanet(name);
    }

}
