package com.test.testpractico.models;

import jakarta.persistence.Embeddable;

import java.util.Date;
@Embeddable
public class Dob {
    private Date date;
    private int age;
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
