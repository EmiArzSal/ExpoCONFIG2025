package com.backend.projectbackend.controllers;

import com.backend.projectbackend.model.Visit;
import com.backend.projectbackend.repository.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/visitas")
public class VisitController {

    @Autowired
    private VisitRepository visitRepository;

    @PostMapping("/registrarVisita")
    public ResponseEntity<?> registrarVisita(@RequestBody VisitRequest request) {
        if (request.getNombre() == null || request.getStand() == null) {
            return ResponseEntity.badRequest().body("Faltan datos");
        }

        Visit nueva = new Visit(request.getNombre(), request.getStand());
        visitRepository.save(nueva);
        return ResponseEntity.ok("Visita registrada con éxito");
    }

    // DTO (clase interna)
    public static class VisitRequest {
        private String nombre;
        private String stand;

        public String getNombre() {
            return nombre;
        }

        public void setNombre(String nombre) {
            this.nombre = nombre;
        }

        public String getStand() {
            return stand;
        }

        public void setStand(String stand) {
            this.stand = stand;
        }
    }
}
