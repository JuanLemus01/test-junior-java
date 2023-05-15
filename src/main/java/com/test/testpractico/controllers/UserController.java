package com.test.testpractico.controllers;

import com.test.testpractico.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.test.testpractico.services.UserService;


import java.util.*;

@RestController
public class UserController {


    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users-order")
    public List<User> getUsers() {
         List<User> users = userService.getUsers();
        for (User user : users) {
            userService.addUser(user);
        }
        return users;
    }
    @GetMapping("/users-find/{age}")
    public List<User>getUsersByAge(@PathVariable int age){
        List<User> users = userService.getUsersByAge(age);
        for (User user : users) {
            userService.addUser(user);
        }
        return users;
    }
    @GetMapping("/users-count")
    public List<User> getUsersLetters() {
        List<User> users = userService.getCountLetters();
        for (User user : users) {
            userService.addUser(user);
        }
        return users;
    }

    @GetMapping("/listusers")
    @ResponseStatus(HttpStatus.OK)
    public List<User> getAllusers(){
        return userService.getAllusers();
    }

    @GetMapping("/useridlist/{email}")
    @ResponseStatus(HttpStatus.OK)
    public User getUserByemail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    @DeleteMapping("/deleteuser/{email}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteUser(@PathVariable String email) {
        userService.deleteUser(email);
    }

    @PutMapping("/userupdate/{email}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<User> updateUser(@PathVariable String email, @RequestBody User updatedUser) {
        User existingUser = userService.getUserByEmail(email);
        existingUser.setPhone(updatedUser.getPhone());
        existingUser.setNat(updatedUser.getNat());

        return ResponseEntity.ok(userService.updateUser(existingUser));
    }









}
