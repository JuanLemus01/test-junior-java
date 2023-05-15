package com.test.testpractico.controllers;

import com.test.testpractico.models.Starship;
import com.test.testpractico.services.StarshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
public class StarshipController {
    private StarshipService starshipService;
    @Autowired
    public StarshipController(StarshipService starshipService) {
        this.starshipService = starshipService;
    }

    @GetMapping("/starships/{passengersQuantity}")
    public Starship getStarships(@PathVariable int passengersQuantity){
        Starship starships = starshipService.getStarships(passengersQuantity);
        starshipService.addStarship(starships, starships.getFilms());
        return starships;
    }

    @GetMapping("/listShips")
    @ResponseStatus(HttpStatus.OK)
    public List<Starship> getAllstarships(){
        return starshipService.getAllstarships();
    }
    @GetMapping("/shipidlist/{name}")
    @ResponseStatus(HttpStatus.OK)
    public Starship getStarshipByName(@PathVariable String name) {
        return starshipService.getStarshipByName(name);
    }
    @DeleteMapping("/deleteship/{name}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteStarship(@PathVariable String name) {
        starshipService.deleteStarship(name);
    }
}
