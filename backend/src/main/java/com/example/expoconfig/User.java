package com.example.expoconfig;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class User {
    @Id
    private Long id;
    private String name;
    private String email;

    public Long getId() {
        return id;
    }

    public String getName(){
        return name;
    }
    
    public String getEmail(){
        return email;
    }

    public void setId(Long id){
        this.id = id;
    }

    public void setName(String name){
        this.name = name;
    }

    public void setEmail(String email){
        this.email = email;
    }
}
