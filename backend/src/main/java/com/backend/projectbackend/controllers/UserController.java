package com.backend.projectbackend.controller;

import com.backend.projectbackend.model.User;
import com.backend.projectbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth/admin")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/usuarios")
    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();
        
        // Esto no es necesario si ya usas String como id, pero sirve para debug
        for (User u : users) {
            System.out.println("ID: " + u.getId() + " (" + u.getId().getClass().getName() + ")");
        }

        return users;
    }

    @GetMapping("/usuarios/{id}")
    public User getUserById(@PathVariable String id) {
        return userRepository.findById(id).orElse(null);
    }

    @PutMapping("/usuarios/{id}")
    public User updateUser(@PathVariable String id, @RequestBody User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setNombreCompleto(updatedUser.getNombreCompleto());
            user.setEmail(updatedUser.getEmail());
            user.setUserType(updatedUser.getUserType());

            if ("alumno".equals(updatedUser.getUserType())) {
                user.setGroup(updatedUser.getGroup());
                user.setBoleta(updatedUser.getBoleta());
                user.setDepartment(null);
            } else if ("profesor".equals(updatedUser.getUserType())) {
                user.setDepartment(updatedUser.getDepartment());
                user.setGroup(null);
                user.setBoleta(null);
            }

            return userRepository.save(user);
        }).orElse(null);
    }

    @DeleteMapping("/usuarios/{id}")
    public void deleteUser(@PathVariable String id) {
        userRepository.deleteById(id);
    }
}
