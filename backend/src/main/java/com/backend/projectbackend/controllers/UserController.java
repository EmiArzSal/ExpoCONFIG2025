package com.backend.projectbackend.controllers;

import com.backend.projectbackend.model.User;
import com.backend.projectbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import com.backend.projectbackend.dto.auth.AdminDTO;
import com.backend.projectbackend.util.responses.ApiResponse;
import com.backend.projectbackend.service.AuthService;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/auth/admin")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

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

    @GetMapping("/admins")
    public ResponseEntity<?> getAllAdmins() {
    List<User> admins = authService.getAllAdmins();
    List<AdminDTO> adminDTOs = admins.stream().map(AdminDTO::new).toList();
    return ResponseEntity.ok(Map.of("admins", adminDTOs));
    }

    @DeleteMapping("/delete-admin/{id}")
    public ResponseEntity<ApiResponse<String>> deleteAdmin(@PathVariable String id) {
        ApiResponse<String> response = authService.deleteAdminById(id);
        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }
}
