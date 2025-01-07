package com.athstock.athstockserver.service;


import org.springframework.stereotype.Service;
import com.athstock.athstockserver.repository.UserRepository;
import com.athstock.athstockserver.domain.User;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void handleCreateUser(User user) {
        this.userRepository.save(user);
    }
}
