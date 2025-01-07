package com.athstock.athstockserver.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.athstock.athstockserver.domain.User;
import com.athstock.athstockserver.service.UserService;


@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping("/user/create")
    public String createNewUser() {
        User user = new User();
        user.setEmail("quanghuy71847@gmail.com");
        user.setName("Nguyen Quang Huy");
        user.setPassword("admin");

        this.userService.handleCreateUser(user);

        return "User Createddddd";
    }
}
