package com.athstock.athstockserver.controller;

import com.athstock.athstockserver.domain.User;
import com.athstock.athstockserver.service.UserService;
// import com.athstock.athstockserver.service.error.IdInvalidException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.lang.Exception;

// import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @PostMapping("/users")
    public ResponseEntity<User> createNewUser(
        @RequestBody User postmanUser
    ) {
        User newUser = this.userService.handleCreateUser(postmanUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @ExceptionHandler(value = InInvalidException.class)
    public ResponseEntity<String> handleException(InInvalidException idException) {
        return ResponseEntity.badRequest().body("testing exception");
    }
    
    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(
        @PathVariable("id") Long id
    ) {
        this.userService.handleDeleteUser(id);
        String msg = String.format("User with id %d has been deleted", id);
        return ResponseEntity.status(HttpStatus.CREATED).body(msg);
        // return ResponseEntity.noContent();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(
        @PathVariable("id") Long id
    ) {
        User fetchedUser = this.userService.fetchUserById(id);
        return ResponseEntity.status(HttpStatus.CREATED).body(fetchedUser);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUser() {
        List<User> allUsers =  this.userService.fetchAllUser();
        return ResponseEntity.status(HttpStatus.CREATED).body(allUsers);
    }

    @PutMapping("/users")
    public ResponseEntity<User> updateUser (
        @RequestBody User reqUser
    ) {
        User updatedUser = this.userService.handleUpdateUser(reqUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(updatedUser);
    }
}
