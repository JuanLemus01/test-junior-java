package com.test.testpractico.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonUnwrapped;

public class User {

    private String gender;
    private NameUsuario name;

    //private Location location;

    private String email;
    private Login login;
    private Dob dob;


    private Registered registered;

    private String idUser;
    @JsonProperty("phone")
    private String phone;
    @JsonProperty("medium")
    private String picture;
    @JsonProperty("nat")
    private String nat;

    private String repLetter;



    public Login getLogin() {
        return login;
    }

    public void setLogin(Login login) {
        this.login = login;
    }

    public NameUsuario getName() {
        return name;
    }

    public void setName(NameUsuario name) {
        this.name = name;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
    public Registered getRegistered() {
        return registered;
    }

    public void setRegistered(Registered registered) {
        this.registered = registered;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getIdUser() {
        return idUser;
    }

    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getNat() {
        return nat;
    }

    public void setNat(String nat) {
        this.nat = nat;
    }

    public Dob getDob() {
        return dob;
    }

    public void setDob(Dob dob) {
        this.dob = dob;
    }

    public String getRepLetter() {
        return repLetter;
    }

    public void setRepLetter(String repLetter) {
        this.repLetter = repLetter;
    }
}
