package com.test.testpractico.controllers;

import com.test.testpractico.models.Starship;
import com.test.testpractico.services.StarshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

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
        return starships;
    }
}
