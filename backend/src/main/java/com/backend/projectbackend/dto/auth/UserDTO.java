package com.backend.projectbackend.dto.auth;

import com.backend.projectbackend.model.User;

public class UserDTO {
    private String id;
    private String email;
    private String nombreCompleto;
    private boolean isAdmin;

    public UserDTO(User user) {
        this.id = user.getId().toHexString();
        this.nombreCompleto = user.getNombreCompleto();
        this.email = user.getEmail();
        this.isAdmin = user.getAdmin();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getNombreCompleto() { return nombreCompleto; }
    public void setNombreCompleto(String nombreCompleto) { this.nombreCompleto = nombreCompleto; }

    public boolean isAdmin() { return isAdmin; }
    public void setAdmin(boolean admin) { this.isAdmin = admin; }
}
