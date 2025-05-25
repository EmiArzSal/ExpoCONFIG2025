package com.backend.projectbackend.model;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
public class User {
    @MongoId
    private ObjectId id;

    @NotBlank
    private String nombreCompleto;

    private String role; 

    @NotBlank
    private String password;

    @NotBlank
    private String group;

    private String department;

    @NotBlank
    private String boleta;

    @Email
    @NotBlank
    private String email;

    private Boolean confirmed = false; //Agregar valor por default
    private Boolean admin = false;

    //Defined routines by the user and used as a template to the training session
    @DBRef
    private List<Routine> routines;

    @DBRef
    private List<TrainingSession> trainings;

    @DBRef
    private List<Friend> friends;

    public User() {}

    public User(String nombreCompleto, String password, String email, String token, Boolean confirmed,Boolean admin, String role, String group, String boleta, String department) {
        this.nombreCompleto = nombreCompleto;
        this.password = password;
        this.role = role;
        this.department = department;
        this.group = group;
        this.boleta = boleta;
        this.email = email;
        this.confirmed = confirmed;
        this.admin = admin;
        this.routines = new ArrayList<>();
        this.trainings = new ArrayList<>();
        this.friends = new ArrayList<>();
    }

    //Getters and setters
    public ObjectId getId() { return id; }
    public void setId(ObjectId id) { this.id = id; }

    public String getNombreCompleto() { return nombreCompleto; }
    public void setNombreCompleto(String nombreCompleto) { this.nombreCompleto = nombreCompleto; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Boolean getConfirmed() { return confirmed; }
    public void setConfirmed() { this.confirmed = true; }

    public Boolean getAdmin() { return admin; }
    public void setAdmin(Boolean admin) { this.admin = admin; }

    public List<Routine> getRoutines() { return routines; }
    public void setRoutines(List<Routine> routines) { this.routines = routines; }

    public List<TrainingSession> getTrainings() { return trainings; }
    public void setTrainings(List<TrainingSession> trainings) {}

    public List<Friend> getFriends() { return friends; }
    public void setFriends(List<Friend> friends) { this.friends = friends; }

    public String getRole(){ return role; }
    public void setRole(String role) {
        this.role = role;
    }

    public String getBoleta(){ return boleta; }
    public void setBoleta(String boleta) {
        this.boleta = boleta;
    }

    public String getGroup(){ return group; }
    public void setGroup(String group) {
        this.group = group;
    }

    public String getDepartment(){ return department; }
    public void setDepartment(String department) {
        this.department = department;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", nombreCompleto='" + nombreCompleto + '\'' +
                ", email='" + email + '\'' +
                ", confirmed=" + confirmed +
                '}';
    }

}
