package com.backend.projectbackend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "visits")
public class Visit {

    @Id
    private String id;

    private String nombreVisitante;
    private String stand;
    private Date fechaHora;

    public Visit(String nombre, String stand) {
        this.nombreVisitante = nombre;
        this.stand = stand;
        this.fechaHora = new Date();
    }

    // Getters y setters

    public String getId() {
        return id;
    }

    public String getNombreVisitante() {
        return nombreVisitante;
    }

    public void setNombreVisitante(String nombreVisitante) {
        this.nombreVisitante = nombreVisitante;
    }

    public String getStand() {
        return stand;
    }

    public void setStand(String stand) {
        this.stand = stand;
    }

    public Date getFechaHora() {
        return fechaHora;
    }

    public void setFechaHora(Date fechaHora) {
        this.fechaHora = fechaHora;
    }
}
