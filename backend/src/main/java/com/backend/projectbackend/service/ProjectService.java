package com.backend.projectbackend.service;

import com.backend.projectbackend.dto.project.FeedbackDTO;
import com.backend.projectbackend.dto.project.ProjectCreateDTO;
import com.backend.projectbackend.model.Project;
import com.backend.projectbackend.repository.ProjectRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project createProject(ProjectCreateDTO dto) {
        Project project = new Project();
        project.setTitle(dto.getTitle());
        project.setGroup(dto.getGroup());
        project.setCareer(dto.getCareer());
        project.setSubject(dto.getSubject());
        project.setIntegrantes(dto.getIntegrantes());
        project.setProfessorName(dto.getProfessorName());
        project.setDocumentUrl(dto.getDocumentUrl());
        project.setRegisterDate(dto.getRegisterDate());
        return projectRepository.save(project);
    }

    public Optional<Project> getProjectById(ObjectId id) {
        return projectRepository.findById(id.toHexString());
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // Filtro general usando parámetros opcionales
    public List<Project> filterProjects(String title, String group, String career, String subject, String status, String professorName, Date startDate, Date endDate) {
        List<Project> projects = projectRepository.findAll();
        return projects.stream()
                .filter(p -> title == null || p.getTitle().toLowerCase().contains(title.toLowerCase()))
                .filter(p -> group == null || p.getGroup().equalsIgnoreCase(group))
                .filter(p -> career == null || p.getCareer().equalsIgnoreCase(career))
                .filter(p -> subject == null || p.getSubject().equalsIgnoreCase(subject))
                .filter(p -> status == null || (p.getStatus() != null && p.getStatus().equalsIgnoreCase(status)))
                .filter(p -> professorName == null || (p.getProfessorName() != null && p.getProfessorName().equalsIgnoreCase(professorName)))
                .filter(p -> startDate == null || (p.getRegisterDate() != null && !p.getRegisterDate().before(startDate)))
                .filter(p -> endDate == null || (p.getRegisterDate() != null && !p.getRegisterDate().after(endDate)))
                .collect(Collectors.toList());
    }

    public Page<Project> getProjectsPage(Pageable pageable) {
        return projectRepository.findAll(pageable);
    }

    public boolean deleteProjectById(ObjectId id) {
        projectRepository.deleteById(id.toHexString());
        return !projectRepository.existsById(id.toHexString());
    }

    public Project updateProject(ObjectId id, ProjectCreateDTO dto) {
        Optional<Project> optionalProject = projectRepository.findById(id.toHexString());
        if (optionalProject.isPresent()) {
            Project project = optionalProject.get();
            project.setTitle(dto.getTitle());
            project.setGroup(dto.getGroup());
            project.setCareer(dto.getCareer());
            project.setSubject(dto.getSubject());
            project.setIntegrantes(dto.getIntegrantes());
            project.setProfessorName(dto.getProfessorName());
            project.setDocumentUrl(dto.getDocumentUrl());
            project.setRegisterDate(dto.getRegisterDate());
            return projectRepository.save(project);
        }
        return null; // O lanza excepción
    }

    public Project acceptProject(ObjectId id) {
        Project project = projectRepository.findById(id.toHexString())
                .orElseThrow(() -> new RuntimeException("Project not found"));
        project.setStatus("Accepted");
        return projectRepository.save(project);
    }

    public Project rejectProject(ObjectId id, String feedback, String professorName) {
        Project project = projectRepository.findById(id.toHexString())
            .orElseThrow(() -> new RuntimeException("Project not found"));
        project.setStatus("Rejected");
        List<FeedbackDTO> feedbackList = project.getFeedback();
        if (feedbackList == null) {
            feedbackList = new ArrayList<>();
        }
        feedbackList.add(new FeedbackDTO(feedback, new Date(), professorName));
        project.setFeedback(feedbackList);
        return projectRepository.save(project);
    }

    public Project giveFeedback(ObjectId id, String feedback, String professorName) {
        Project project = projectRepository.findById(id.toHexString())
            .orElseThrow(() -> new RuntimeException("Project not found"));
        List<FeedbackDTO> feedbackList = project.getFeedback();
        if (feedbackList == null) {
            feedbackList = new ArrayList<>();
        }
        feedbackList.add(new FeedbackDTO(feedback, new Date(), professorName));
        project.setFeedback(feedbackList);
        return projectRepository.save(project);
    }

    // Si necesitas proyectos por profesor autenticado
    public List<Project> getProjectsByProfessorName(String professorName) {
        return projectRepository.findByProfessorNameContainingIgnoreCase(professorName);
    }
}