package com.test.testpractico.models;

import jakarta.persistence.*;

import java.util.List;
@Entity
@Table(name = "starship")
public class Starship {
    @Id
    @Column(name = "name")
    private String name;
    @Column(name = "model")
    private String model;
    @Column(name = "max_atmosphering_speed")
    private String max_atmosphering_speed;
    @Column(name = "passengers")
    private String passengers;
    @Column(name = "consumables")
    private String consumables;
    @OneToMany(mappedBy = "starshipF", cascade = CascadeType.ALL)
    private List<Film> films;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getMax_atmosphering_speed() {
        return max_atmosphering_speed;
    }

    public void setMax_atmosphering_speed(String max_atmosphering_speed) {
        this.max_atmosphering_speed = max_atmosphering_speed;
    }

    public String getPassengers() {
        return passengers;
    }

    public void setPassengers(String passengers) {
        this.passengers = passengers;
    }

    public String getConsumables() {
        return consumables;
    }

    public void setConsumables(String consumables) {
        this.consumables = consumables;
    }

    public List<Film> getFilms() {
        return films;
    }

    public void setFilms(List<Film> films) {
        this.films = films;
    }
}
