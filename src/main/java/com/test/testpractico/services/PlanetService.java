package com.test.testpractico.services;

import com.test.testpractico.models.Planet;
import com.test.testpractico.models.PlanetResponse;
import com.test.testpractico.repositories.InPlanetsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlanetService {

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private InPlanetsRepo repoplanet;

    public Planet getPlanet(@PathVariable String terrainFind){

        List<Planet> planetPages = new ArrayList<>();

        String urlSwapi = "https://swapi.dev/api/planets";

        for (int i = 0; i < 7; i++) {

            ResponseEntity<PlanetResponse> response;
            if (i == 0) {
                response = restTemplate.exchange(urlSwapi, HttpMethod.GET, null, PlanetResponse.class);
            } else {
                response = restTemplate.exchange(urlSwapi + "/?page=" + i, HttpMethod.GET, null, PlanetResponse.class);
            }
            List<Planet> planets = response.getBody().getResults();

            List<Planet> filterPlanets = planets.stream()
                    .filter(planet -> !planet.getTerrain().equals("n/a") && !planet.getTerrain().equals("unknown")
                                    && !planet.getPopulation().equals("unknown")
                                    && !planet.getPopulation().equals("n/a")
                                    && planet.getTerrain().replace(",","").toLowerCase().contains(terrainFind.toLowerCase())
                    )
                    .collect(Collectors.toList());

            planetPages.addAll(filterPlanets);
        }
        planetPages.sort(Comparator.comparing(s -> Long.parseLong(s.getPopulation())));

        return planetPages.isEmpty() ? null : planetPages.get(planetPages.size()-1) ;
    }
    public Planet addPlanet(Planet p){
        return repoplanet.save(p);
    }
    public void deletePlanet(String name){
        repoplanet.deleteByName(name);
    }
    public List<Planet> getAllplanets(){
        return repoplanet.findAll();
    }
    public Planet getPlanetByName(String name) {
        return repoplanet.findByName(name);
    }
}
