package com.test.testpractico.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "film")
public class Film {

    @Id
    @Column(name = "film")
    private String film;

    @ManyToOne
    @JoinColumn(name = "starship")
    private Starship starshipF;

    public Film() {
        // Constructor por defecto necesario para la deserialización
    }

    public Film(String film) {
        this.film = film;
    }

    public String getFilm() {
        return film;
    }

    public void setFilm(String film) {
        this.film = film;
    }

    public Starship getStarshipF() {
        return starshipF;
    }

    public void setStarshipF(Starship starshipF) {
        this.starshipF = starshipF;
    }
}
