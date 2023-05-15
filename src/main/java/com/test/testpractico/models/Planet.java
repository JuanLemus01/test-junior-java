package com.test.testpractico.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "planet")
public class Planet {
    @Id
    @Column(name = "name")
    private String name;
    @Column(name = "terrain")
    private String terrain;
    @Column(name = "population")
    private String population;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getTerrain() {
        return terrain;
    }
    public void setTerrain(String terrain) {
        this.terrain = terrain;
    }
    public String getPopulation() {
        return population;
    }
    public void setPopulation(String population) {
        this.population = population;
    }
}
