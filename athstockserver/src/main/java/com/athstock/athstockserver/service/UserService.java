package com.athstock.athstockserver.service;


import java.util.Optional;
import java.util.List;

import org.springframework.stereotype.Service;

import com.athstock.athstockserver.domain.User;
import com.athstock.athstockserver.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User handleCreateUser(User user) {
        return this.userRepository.save(user);
    }

    public void handleDeleteUser(Long id) {
        this.userRepository.deleteById(id);
    }

    public User fetchUserById(Long id) {
        Optional<User> userOptional = this.userRepository.findById(id);
        return userOptional.isPresent() ? userOptional.get() : null;
    }

    public List<User> fetchAllUser() {
        return this.userRepository.findAll();
    }

    public User handleUpdateUser(User reqUser) {
        User currentUser = this.fetchUserById(reqUser.getId());

        if(currentUser != null) {
            currentUser.setEmail(reqUser.getEmail());
            currentUser.setName(reqUser.getName());
            currentUser.setPassword(reqUser.getPassword());

            // update
            currentUser = this.userRepository.save(currentUser);
        }

        return currentUser;
    }
}
