package com.backend.projectbackend.controllers;

import org.bson.types.ObjectId;
import com.backend.projectbackend.dto.project.ProjectCreateDTO;
import com.backend.projectbackend.dto.project.ProjectResponseDTO;
import com.backend.projectbackend.model.Project;
import com.backend.projectbackend.model.User;
import com.backend.projectbackend.service.ProjectService;
import com.backend.projectbackend.util.responses.ApiResponse;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping
    public ResponseEntity<List<ProjectResponseDTO>> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        List<ProjectResponseDTO> projectDTOs = projects.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(projectDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> getProjectById(@PathVariable ObjectId id) {
        Project project = projectService.getProjectById(id).orElse(null);
        if (project != null) {
            return ResponseEntity.ok(convertToDTO(project));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<ProjectResponseDTO> createProject(@Valid @RequestBody ProjectCreateDTO projectCreateDTO) {
        Project project = projectService.createProject(projectCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(project));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> updateProject(@PathVariable ObjectId id, @Valid @RequestBody ProjectCreateDTO projectCreateDTO) {
        Project project = projectService.updateProject(id, projectCreateDTO);
        if (project != null) {
            return ResponseEntity.ok(convertToDTO(project));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable ObjectId id) {
        if (projectService.deleteProjectById(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private ProjectResponseDTO convertToDTO(Project project) {
        // Adjust the constructor call to match the actual ProjectResponseDTO constructor
        // Adjust the constructor call to match the actual ProjectResponseDTO constructor
        ProjectResponseDTO dto = new ProjectResponseDTO();
        dto.setId(project.getId());
        dto.setTitle(project.getTitle());
        dto.setGroup(project.getGroup());
        dto.setDescription(project.getDescription());
        dto.setCareer(project.getCareer());
        dto.setSubject(project.getSubject());
        dto.setOwner(project.getOwner());
        dto.setIntegrantes(project.getIntegrantes());
        dto.setProfessorName(project.getProfessorName());
        dto.setDocumentUrl(project.getDocumentUrl());
        dto.setStatus(project.getStatus());
        dto.setFeedback(project.getFeedback());
        dto.setRegisterDate(project.getRegisterDate());
        return dto;
    }
}