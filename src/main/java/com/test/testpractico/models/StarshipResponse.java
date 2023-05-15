package com.test.testpractico.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class StarshipResponse {
    @JsonProperty("results")
    private List<Starship> results;
    public List<Starship> getResults() {
        return results;
    }
    public void setResults(List<Starship> results) {
        this.results = results;
    }
}
