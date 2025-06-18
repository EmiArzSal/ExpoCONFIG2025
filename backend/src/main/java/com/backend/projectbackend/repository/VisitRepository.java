package com.backend.projectbackend.repository;

import com.backend.projectbackend.model.Visit;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface VisitRepository extends MongoRepository<Visit, String> {
    
    // Buscar visitas por tipo de visitante
    Page<Visit> findByTipoVisitante(String tipoVisitante, Pageable pageable);

    // Buscar visitas por proyecto
    List<Visit> findByProyectoId(String proyectoId);
    
    // Buscar visitas por stand
    List<Visit> findByStand(String stand);
    
    // Buscar visitas por email (para evitar duplicados si es necesario)
    Optional<Visit> findByEmail(String email);
    
    // Contar visitas por fecha (del día actual)
    @Query("{ 'fechaVisita' : { $gte: ?0, $lt: ?1 } }")
    List<Visit> findByFechaVisitaBetween(Date startDate, Date endDate);
    
    // Contar visitas por proyecto
    long countByProyectoId(String proyectoId);

    // Contar visitas por tipo de visitante
    long countByTipoVisitante(String tipoVisitante);

    // Contar visitas por stand
    long countByStand(String stand);
}