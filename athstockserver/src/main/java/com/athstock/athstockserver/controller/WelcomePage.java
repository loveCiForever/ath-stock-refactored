package com.athstock.athstockserver.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class WelcomePage {
    
    @GetMapping("/welcomepage")
    public String welcomePage() {
        return "Welcome to my page";
    }
    
}
