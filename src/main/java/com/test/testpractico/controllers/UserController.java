package com.test.testpractico.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.test.testpractico.models.User;
import com.test.testpractico.models.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import com.test.testpractico.services.UserService;


import java.util.*;

@RestController
public class UserController {

    private RestTemplate restTemplate;
    private UserService userService;


    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users-order")
    public List<User> getUsers() {
         List<User> users = userService.getUsers();
        return users;
    }


    @GetMapping("/users-find/{age}")
    public List<User>getUsersByAge(@PathVariable int age){
        List<User> users = userService.getUsersByAge(age);
        return users;
    }


    @GetMapping("/users-count")
    public List<User> getUsersLetters() {
        List<User> users = userService.getCountLetters();
        return users;
    }








}
