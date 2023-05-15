package com.test.testpractico.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import jakarta.persistence.*;

@Entity
@Table(name = "usertest")
public class User {
    @Id
    @Column(name = "email")
    private String email;
    @Column(name = "gender")
    private String gender;
    @Embedded
    private NameUsuario name;
    @Embedded
    private Dob dob;
    @Column(name = "phone")
    private String phone;
    @Embedded
    private Picture picture;
    @Column(name = "nat")
    private String nat;
    private String repLetter;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public NameUsuario getName() {
        return name;
    }

    public void setName(NameUsuario name) {
        this.name = name;
    }

    public Dob getDob() {
        return dob;
    }

    public void setDob(Dob dob) {
        this.dob = dob;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Picture getPicture() {
        return picture;
    }

    public void setPicture(Picture picture) {
        this.picture = picture;
    }

    public String getNat() {
        return nat;
    }

    public void setNat(String nat) {
        this.nat = nat;
    }

    public String getRepLetter() {
        return repLetter;
    }

    public void setRepLetter(String repLetter) {
        this.repLetter = repLetter;
    }
}
