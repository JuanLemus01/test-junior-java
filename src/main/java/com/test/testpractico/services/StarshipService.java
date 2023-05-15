package com.test.testpractico.services;

import com.test.testpractico.models.Film;
import com.test.testpractico.models.Starship;
import com.test.testpractico.models.StarshipResponse;
import com.test.testpractico.repositories.InStarshipRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class StarshipService {

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private InStarshipRepo repostarship;

    public Starship getStarships(@PathVariable int passengersQuantity){

        List<Starship> starshipsPages = new ArrayList<>();

        String urlSwapi = "https://swapi.dev/api/starships";

        List<String> consumablesOpt = Arrays.asList("week", "weeks", "month", "months", "year", "years");
        List<String> allowfilmsList = Arrays.asList("4", "5", "6");

        for (int i = 0; i < 5; i++) {

            ResponseEntity<StarshipResponse> response;
            if (i == 0) {
                response = restTemplate.exchange(urlSwapi, HttpMethod.GET, null, StarshipResponse.class);
            } else {
                response = restTemplate.exchange(urlSwapi + "/?page=" + i, HttpMethod.GET, null, StarshipResponse.class);
            }
            List<Starship> starships = response.getBody().getResults();

            List<Starship> filteredStarships = starships.stream()
                    .filter(ship -> !ship.getPassengers().equals("n/a") && !ship.getPassengers().equals("unknown")
                            && !ship.getConsumables().equals("unknown")
                            && !ship.getMax_atmosphering_speed().equals("unknown")
                            && !ship.getMax_atmosphering_speed().equals("n/a")
                            && Double.parseDouble(ship.getPassengers().replace(",", "")) >= passengersQuantity
                            && consumablesOpt.contains(ship.getConsumables().split(" ")[1])
                            && ship.getFilms().stream().filter(film -> allowfilmsList.contains(film.getFilm().length() >= 2 ? String.valueOf(film.getFilm().charAt(film.getFilm().length() - 2)) : "")
                            ).count() > 0
                    )
                    .collect(Collectors.toList());

            starshipsPages.addAll(filteredStarships);

        }
        starshipsPages.sort(Comparator.comparing(s -> Long.parseLong(s.getMax_atmosphering_speed())));

        return starshipsPages.isEmpty() ? null : starshipsPages.get(starshipsPages.size()-1) ;
    }

    public Starship addStarship(Starship s,List<Film> films){
        s.setFilms(films);
        return repostarship.save(s);
    }
    public void deleteStarship(String name){
        repostarship.deleteByName(name);
    }
    public List<Starship> getAllstarships(){
        return repostarship.findAllFetch();
    }
    public Starship getStarshipByName(String name) {
        return repostarship.findByName(name);
    }
    public Starship updateStarship(Starship updatedStarship) {
        Starship responseShip = repostarship.findByName(updatedStarship.getName());

        responseShip.setPassengers(updatedStarship.getPassengers());
        responseShip.setConsumables(updatedStarship.getConsumables());
        responseShip.setMax_atmosphering_speed(updatedStarship.getMax_atmosphering_speed());
        responseShip.setModel(updatedStarship.getModel());

        return repostarship.save(responseShip);

    }



}
