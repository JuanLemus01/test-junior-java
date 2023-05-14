package com.test.testpractico.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class StarShipEesponse {

    @JsonProperty("results")
    private List<String> results;

    public List<String> getResults() {
        return results;
    }
}
