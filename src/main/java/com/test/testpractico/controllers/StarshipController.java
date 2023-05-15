package com.test.testpractico.controllers;

import com.test.testpractico.models.Starship;
import com.test.testpractico.services.StarshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @PutMapping("/starshiprupdate/{name}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Starship> updateUser(@PathVariable String name, @RequestBody Starship updatedShep) {
        Starship existingShip = starshipService.getStarshipByName(name);
        existingShip.setPassengers(updatedShep.getPassengers());
        existingShip.setConsumables(updatedShep.getConsumables());
        existingShip.setMax_atmosphering_speed(updatedShep.getMax_atmosphering_speed());
        return ResponseEntity.ok(starshipService.updateStarship(existingShip));
    }
}
