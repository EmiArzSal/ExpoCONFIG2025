package com.backend.projectbackend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "visits")
public class Visit {

    @Id
    private String id;

    // Atributos de la visita
    private String nombre;
    private String email;
    private String telefono;
    private String institucion;
    private String tipoVisitante;
    private String proyectoId;
    private String proyectoTitulo;
    private String stand;
    private String comentarios;
    private Date fechaVisita;

    // Constructor vacío para MongoDB
    public Visit() {
        this.fechaVisita = new Date();
    }

    // Constructor con parámetros básicos
    public Visit(String nombre, String email, String tipoVisitante, String proyectoId, String stand) {
        this.nombre = nombre;
        this.email = email;
        this.tipoVisitante = tipoVisitante;
        this.proyectoId = proyectoId;
        this.stand = stand;
        this.fechaVisita = new Date();
    }

    // Getters y setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getInstitucion() {
        return institucion;
    }

    public void setInstitucion(String institucion) {
        this.institucion = institucion;
    }

    public String getTipoVisitante() {
        return tipoVisitante;
    }

    public void setTipoVisitante(String tipoVisitante) {
        this.tipoVisitante = tipoVisitante;
    }

    public String getProyectoId() {
        return proyectoId;
    }

    public void setProyectoId(String proyectoId) {
        this.proyectoId = proyectoId;
    }

    public String getProyectoTitulo() {
        return proyectoTitulo;
    }

    public void setProyectoTitulo(String proyectoTitulo) {
        this.proyectoTitulo = proyectoTitulo;
    }

    public String getStand() {
        return stand;
    }

    public void setStand(String stand) {
        this.stand = stand;
    }

    public String getComentarios() {
        return comentarios;
    }

    public void setComentarios(String comentarios) {
        this.comentarios = comentarios;
    }

    public Date getFechaVisita() {
        return fechaVisita;
    }

    public void setFechaVisita(Date fechaVisita) {
        this.fechaVisita = fechaVisita;
    }
}