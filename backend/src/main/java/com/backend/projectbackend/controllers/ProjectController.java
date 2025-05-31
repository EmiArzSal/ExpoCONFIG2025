package com.backend.projectbackend.controllers;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.ArrayList;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.backend.projectbackend.dto.project.FeedbackDTO;
import com.backend.projectbackend.dto.project.ProjectCreateDTO;
import com.backend.projectbackend.dto.project.ProjectResponseDTO;
import com.backend.projectbackend.model.Project;
import com.backend.projectbackend.model.User;
import com.backend.projectbackend.service.FileService;
import com.backend.projectbackend.service.ProjectService;
import com.backend.projectbackend.util.responses.ApiResponse;
import org.springframework.security.access.prepost.PreAuthorize;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private FileService fileService;

    // 1. Obtener proyectos con filtros (query params)
    @GetMapping
    public ResponseEntity<List<ProjectResponseDTO>> getProjects(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String group,
            @RequestParam(required = false) String career,
            @RequestParam(required = false) String subject,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String professorName,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate
    ) {
        List<Project> projects = projectService.filterProjects(title, group, career, subject, status, professorName, startDate, endDate);
        List<ProjectResponseDTO> projectDTOs = projects.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(projectDTOs);
    }

    // 2. Obtener proyecto por ID
    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> getProjectById(@PathVariable ObjectId id) {
        Project project = projectService.getProjectById(id).orElse(null);
        if (project != null) {
            return ResponseEntity.ok(convertToDTO(project));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 3. Crear proyecto
    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<ProjectResponseDTO> createProject(@Valid @RequestBody ProjectCreateDTO projectCreateDTO, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        if (!"PROFESOR".equalsIgnoreCase(user.getUserType())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Project project = projectService.createProject(projectCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(project));
    }

    // 4. Actualizar proyecto
    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> updateProject(@PathVariable ObjectId id, @Valid @RequestBody ProjectCreateDTO projectCreateDTO) {
        Project project = projectService.updateProject(id, projectCreateDTO);
        if (project != null) {
            return ResponseEntity.ok(convertToDTO(project));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 5. Eliminar proyecto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable ObjectId id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        if (!"PROFESOR".equalsIgnoreCase(user.getUserType()) && !"ADMIN".equalsIgnoreCase(user.getUserType())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }       
        if (projectService.deleteProjectById(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 6. Subir documento
    @PostMapping("/{id}/document")
    public ResponseEntity<ApiResponse<String>> uploadDocument(
            @PathVariable ObjectId id,
            @RequestParam("file") MultipartFile file) {
        try {
            String documentUrl = fileService.uploadFile(file);
            Project project = projectService.getProjectById(id).orElseThrow();
            project.setDocumentUrl(documentUrl);
            projectService.updateProject(id, convertToCreateDTO(project));
            return ResponseEntity.ok(new ApiResponse<>(true, "Document uploaded successfully", documentUrl));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, "Error uploading document", null));
        }
    }

    // 7. Acciones de estado
    @PutMapping("/{id}/accept")
    public ResponseEntity<ProjectResponseDTO> acceptProject(@PathVariable ObjectId id, Authentication authentication) {
    User user = (User) authentication.getPrincipal();
    if (!"PROFESOR".equalsIgnoreCase(user.getUserType())) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    Project project = projectService.acceptProject(id);
    return ResponseEntity.ok(convertToDTO(project));
}

    @PutMapping("/{id}/reject")
    public ResponseEntity<ProjectResponseDTO> rejectProject(
        @PathVariable ObjectId id,
        @RequestBody Map<String, String> request,
        Authentication authentication) {
    User user = (User) authentication.getPrincipal();
    if (!"PROFESOR".equalsIgnoreCase(user.getUserType())) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    String feedback = request.get("feedback");
    Project project = projectService.rejectProject(id, feedback, request.get("professorName"));
    if (project == null) {
        return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(convertToDTO(project));
}
    @PutMapping("/{id}/feedback")
    public ResponseEntity<ProjectResponseDTO> giveFeedback(
        @PathVariable ObjectId id,
        @RequestBody FeedbackDTO feedback,
        Authentication authentication) {
    User user = (User) authentication.getPrincipal();
    if (!"PROFESOR".equalsIgnoreCase(user.getUserType())) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    Project project = projectService.getProjectById(id).orElseThrow();
    if(project.getFeedback() == null ){
        project.setFeedback(new ArrayList<>());
    }
    project.getFeedback().add(feedback);
    projectService.updateProject(id, convertToCreateDTO(project));
    return ResponseEntity.ok(convertToDTO(project));
}

    // 8. Paginación (opcional)
    @GetMapping("/paginated")
    public ResponseEntity<Page<ProjectResponseDTO>> getProjectsPage(Pageable pageable) {
        Page<Project> projectsPage = projectService.getProjectsPage(pageable);
        Page<ProjectResponseDTO> projectDTOsPage = projectsPage.map(this::convertToDTO);
        return ResponseEntity.ok(projectDTOsPage);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/test-auth")
    public ResponseEntity<String> testAuth(Authentication authentication) {
        Object principal = authentication.getPrincipal();
        if (principal instanceof com.backend.projectbackend.model.User user) {
            return ResponseEntity.ok("userType: " + user.getUserType());
        }
        return ResponseEntity.ok("Principal class: " + principal.getClass().getName());
    }

    // 9. Estadísticas para dashboard
    @GetMapping("/dashboard/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        List<Project> allProjects = projectService.getAllProjects();
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalProjects", allProjects.size());
        stats.put("byStatus", allProjects.stream()
                .filter(p -> p.getStatus() != null)
                .collect(Collectors.groupingBy(Project::getStatus, Collectors.counting())));
        stats.put("byCareer", allProjects.stream()
                .collect(Collectors.groupingBy(Project::getCareer, Collectors.counting())));
        stats.put("bySubject", allProjects.stream()
                .collect(Collectors.groupingBy(Project::getSubject, Collectors.counting())));
        return ResponseEntity.ok(stats);
    }

    // 10. Proyectos del profesor autenticado (opcional)
    @GetMapping("/my-projects")
    public ResponseEntity<List<ProjectResponseDTO>> getMyProjects(Authentication authentication) {
    User user = (User) authentication.getPrincipal();
    if (!"PROFESOR".equalsIgnoreCase(user.getUserType())) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    List<Project> projects = projectService.getProjectsByProfessorName(user.getNombreCompleto());
    List<ProjectResponseDTO> projectDTOs = projects.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    return ResponseEntity.ok(projectDTOs);
}


    // --- Métodos auxiliares ---

    private ProjectResponseDTO convertToDTO(Project project) {
        ProjectResponseDTO dto = new ProjectResponseDTO();
        dto.setId(project.getId());
        dto.setTitle(project.getTitle());
        dto.setGroup(project.getGroup());
        dto.setDescription(project.getDescription());
        dto.setCareer(project.getCareer());
        dto.setSubject(project.getSubject());
        dto.setIntegrantes(project.getIntegrantes());
        dto.setProfessorName(project.getProfessorName());
        dto.setDocumentUrl(project.getDocumentUrl());
        dto.setStatus(project.getStatus());
        dto.setFeedback(project.getFeedback());
        dto.setRegisterDate(project.getRegisterDate());
        return dto;
    }

    private ProjectCreateDTO convertToCreateDTO(Project project) {
        ProjectCreateDTO dto = new ProjectCreateDTO();
        dto.setTitle(project.getTitle());
        dto.setGroup(project.getGroup());
        dto.setDescription(project.getDescription());
        dto.setCareer(project.getCareer());
        dto.setSubject(project.getSubject());
        dto.setIntegrantes(project.getIntegrantes());
        dto.setProfessorName(project.getProfessorName());
        dto.setDocumentUrl(project.getDocumentUrl());
        dto.setRegisterDate(project.getRegisterDate());
        return dto;
    }
}