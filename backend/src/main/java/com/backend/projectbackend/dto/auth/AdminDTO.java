package com.backend.projectbackend.dto.auth;

import com.backend.projectbackend.model.User;

public class AdminDTO{
    private String id;
    private String email;
    private String nombreCompleto;

    public AdminDTO(User user) {
        this.id = user.getId().toHexString();
        this.nombreCompleto = user.getNombreCompleto();
        this.email = user.getEmail();
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getNombreCompleto() {
        return nombreCompleto;
    }
    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }
  }