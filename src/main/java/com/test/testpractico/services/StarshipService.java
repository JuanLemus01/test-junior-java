package com.test.testpractico.services;

import com.test.testpractico.models.Starship;
import com.test.testpractico.models.StarshipResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StarshipService {

    @Autowired
    private RestTemplate restTemplate;

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
                                    && ship.getFilms().stream().filter(film -> allowfilmsList.contains(film.length() >= 2 ? String.valueOf(film.charAt(film.length() - 2)) : "")

                            ).count() > 0
                    )
                    .collect(Collectors.toList());

            starshipsPages.addAll(filteredStarships);
        }
        starshipsPages.sort(Comparator.comparing(s -> Long.parseLong(s.getMax_atmosphering_speed())));

        return starshipsPages.isEmpty() ? null : starshipsPages.get(starshipsPages.size()-1) ;
    }


}
