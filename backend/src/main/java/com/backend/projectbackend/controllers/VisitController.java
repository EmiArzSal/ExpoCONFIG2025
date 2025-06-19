package com.backend.projectbackend.controllers;

import com.backend.projectbackend.model.Visit;
import com.backend.projectbackend.repository.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/visitas")
public class VisitController {

    @Autowired
    private VisitRepository visitRepository;

    @PostMapping("/registrarVisita")
    public ResponseEntity<?> registrarVisita(@RequestBody VisitRequest request) {
        // Validaciones básicas
        if (request.getNombre() == null || request.getNombre().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(createErrorResponse("El nombre es obligatorio"));
        }
        
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(createErrorResponse("El email es obligatorio"));
        }
        
        if (request.getTipoVisitante() == null || request.getTipoVisitante().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(createErrorResponse("El tipo de visitante es obligatorio"));
        }
        
        if (request.getProyectoId() == null || request.getProyectoId().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(createErrorResponse("Debe seleccionar un proyecto"));
        }

        try {
            // Crear nueva visita
            Visit nuevaVisita = new Visit();
            nuevaVisita.setNombre(request.getNombre().trim());
            nuevaVisita.setEmail(request.getEmail().trim());
            nuevaVisita.setTelefono(request.getTelefono());
            nuevaVisita.setInstitucion(request.getInstitucion());
            nuevaVisita.setTipoVisitante(request.getTipoVisitante());
            nuevaVisita.setProyectoId(request.getProyectoId());
            nuevaVisita.setProyectoTitulo(request.getProyectoTitulo());
            nuevaVisita.setStand(request.getStand());
            nuevaVisita.setComentarios(request.getComentarios());

            // Guardar en la base de datos
            Visit visitaGuardada = visitRepository.save(nuevaVisita);

            // Respuesta exitosa
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Visita registrada exitosamente");
            response.put("visitaId", visitaGuardada.getId());
            response.put("fechaRegistro", visitaGuardada.getFechaVisita());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(createErrorResponse("Error interno del servidor: " + e.getMessage()));
        }
    }

    @GetMapping("/estadisticas")
    public ResponseEntity<?> obtenerEstadisticas() {
        try {
            Map<String, Object> estadisticas = new HashMap<>();
            estadisticas.put("totalVisitas", visitRepository.count());
            // Contar por tipo de visitante
            Map<String, Long> porTipo = new HashMap<>();
            porTipo.put("estudiante", visitRepository.countByTipoVisitante("estudiante"));
            porTipo.put("profesor",   visitRepository.countByTipoVisitante("profesor"));
            porTipo.put("empresa",    visitRepository.countByTipoVisitante("empresa"));
            porTipo.put("publico",    visitRepository.countByTipoVisitante("publico"));
            porTipo.put("familia",    visitRepository.countByTipoVisitante("familia"));
            estadisticas.put("porTipoVisitante", porTipo);
            return ResponseEntity.ok(estadisticas);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(createErrorResponse("Error al obtener estadísticas: " + e.getMessage()));
    }
}

    @GetMapping("/todas")
    public ResponseEntity<?> obtenerTodasLasVisitas(@RequestParam(defaultValue = "0") int page, 
                                                    @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Visit> visitas = visitRepository.findAll(pageable);
            return ResponseEntity.ok(visitas);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(createErrorResponse("Error al obtener las visitas: " + e.getMessage()));
        }
    }

    // Método auxiliar para crear respuestas de error
    private Map<String, Object> createErrorResponse(String message) {
        Map<String, Object> error = new HashMap<>();
        error.put("success", false);
        error.put("message", message);
        return error;
    }

    // DTO actualizado
    public static class VisitRequest {
        private String nombre;
        private String email;
        private String telefono;
        private String institucion;
        private String tipoVisitante;
        private String proyectoId;
        private String proyectoTitulo;
        private String stand;
        private String comentarios;

        // Getters y setters
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
    }
}