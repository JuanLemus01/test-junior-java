package com.test.testpractico.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class PlanetResponse {
    @JsonProperty("results")
    private List<Planet> results;

    public List<Planet> getResults() {
        return results;
    }

    public void setResults(List<Planet> results) {
        this.results = results;
    }
}
