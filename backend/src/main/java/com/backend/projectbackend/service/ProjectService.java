package com.backend.projectbackend.service;

import com.backend.projectbackend.dto.project.ProjectCreateDTO;
import com.backend.projectbackend.model.Project;
import com.backend.projectbackend.repository.ProjectRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.management.RuntimeErrorException;

@Service
public class ProjectService {
  private final ProjectRepository projectRepository;

  @Autowired
  public ProjectService(ProjectRepository projectRepository) {
    this.projectRepository = projectRepository;
  }
  public Project createProject(ProjectCreateDTO projectCreateDTO) {
    Project project = new Project();
    project.setTitle(projectCreateDTO.getTitle());
    project.setGroup(projectCreateDTO.getGroup());
    project.setCareer(projectCreateDTO.getCareer());
    project.setSubject(projectCreateDTO.getSubject());
    project.setOwner(projectCreateDTO.getOwner());
    project.setIntegrantes(projectCreateDTO.getIntegrantes());
    project.setProfessorName(projectCreateDTO.getProfessorName());
    return projectRepository.save(project);
  }
  public Optional<Project> getProjectById(ObjectId id) {
    return projectRepository.findById(id.toHexString());
  }
  public List<Project> getAllProjects() {
    return projectRepository.findAll();
  }
  public List<Project> searchProjects(String query) {
    List<Project> projectsByTitle = projectRepository.findByTitleContainingIgnoreCase(query);
    List<Project> projectsByGroup = projectRepository.findByGroupContainingIgnoreCase(query);
    List<Project> projectsByCareer = projectRepository.findByCareerContainingIgnoreCase(query);
    List<Project> projectsBySubject = projectRepository.findBySubjectContainingIgnoreCase(query);
    List<Project> projectsByOwner = projectRepository.findByOwnerContainingIgnoreCase(query);

    return Stream.of(projectsByTitle, projectsByGroup, projectsByCareer, projectsBySubject, projectsByOwner)
                .flatMap(List::stream)
                .distinct()
                .collect(Collectors.toList());
  }


  public List<Project> getProjectsByIntegrantes(List<String> integrantes) {
    return projectRepository.findByIntegrantesIn(integrantes);
  }
  public List<Project> getProjectsByGroupAndProfessorName(String group, String professorName) {
    return projectRepository.findByGroupAndProfessorName(group, professorName);
  }
  public List<Project> getProjectsByProfessorName(String professorName) {
    return projectRepository.findByProfessorName(professorName);
  }
  public List<Project> getProjectsByFechaRegistroBetween(Date startDate, Date endDate) {
    return projectRepository.findByFechaRegistroBetween(startDate, endDate);
  }
  public Page<Project> getProjectsPage(Pageable pageable) {
    return projectRepository.findAll(pageable);
  }
  public boolean deleteProjectById(ObjectId id) {
    projectRepository.deleteById(id.toHexString());
    return !projectRepository.existsById(id.toHexString());
  }
  public Project updateProject(ObjectId id, ProjectCreateDTO projectCreateDTO) {
    Optional<Project> optionalProject = projectRepository.findById(id.toHexString());
    if (optionalProject.isPresent()) {
      Project project = optionalProject.get();
      project.setTitle(projectCreateDTO.getTitle());
      project.setGroup(projectCreateDTO.getGroup());
      project.setCareer(projectCreateDTO.getCareer());
      project.setSubject(projectCreateDTO.getSubject());
      project.setOwner(projectCreateDTO.getOwner());
      project.setIntegrantes(projectCreateDTO.getIntegrantes());
      project.setProfessorName(projectCreateDTO.getProfessorName());
      return projectRepository.save(project);
    }
    return null; // or throw an exception
  }

  public Project acceptProject(ObjectId id){
    Project project = projectRepository.findById(id.toHexString()).orElseThrow(() -> new RuntimeException("Project not found"));
      project.setStatus("Accepted");
      return projectRepository.save(project);
  }

  public Project rejectProject(ObjectId id, String feedback) {
    Project project = projectRepository.findById(id.toHexString())
        .orElseThrow(() -> new RuntimeException("Project not found"));
    project.setStatus("rechazado");
    project.setFeedback(feedback);
    return projectRepository.save(project);
  }

  public Project giveFeedback(ObjectId id, String feedback) {
    Project project = projectRepository.findById(id.toHexString())
        .orElseThrow(() -> new RuntimeException("Project not found"));
    project.setFeedback(feedback);
    return projectRepository.save(project);
  }

  public List<Project> getProjectsByTitle(String title) {
    return projectRepository.findByTitleContainingIgnoreCase(title);
  }
  public List<Project> getProjectsByGroup(String group) {
    return projectRepository.findByGroupContainingIgnoreCase(group);
  }
  public List<Project> getProjectsByCareer(String career) {
    return projectRepository.findByCareerContainingIgnoreCase(career);
  }
  public List<Project> getProjectsBySubject(String subject) {
    return projectRepository.findBySubjectContainingIgnoreCase(subject);
  }
  public List<Project> getProjectsByOwner(String owner) {
    return projectRepository.findByOwnerContainingIgnoreCase(owner);
  }
  public List<Project> getProjectsByIntegrantes(String integrante) {
    return projectRepository.findByIntegrantesIn(List.of(integrante));
  }
  public List<Project> getProjectsByProfessorNameAndGroup(ObjectId professorName, String group) {
    return projectRepository.findByGroupAndProfessorName(group, professorName.toHexString());
  }
}
