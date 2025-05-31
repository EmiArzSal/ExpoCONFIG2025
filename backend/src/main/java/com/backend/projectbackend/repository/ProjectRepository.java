package com.backend.projectbackend.repository;

import com.backend.projectbackend.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Date;

public interface ProjectRepository extends MongoRepository<Project, String> {
    List<Project> findByProjectNameContainingIgnoreCase(String ProjectName);
    List<Project> findByGroupContainingIgnoreCase(String group);
    List<Project> findByCareerContainingIgnoreCase(String career);
    List<Project> findBySubjectContainingIgnoreCase(String subject);
    List<Project> findByProfessorNameContainingIgnoreCase(String professorName);
    List<Project> findByRegisterDateBetween(Date startDate, Date endDate);
    List<Project> findByStatus(String status);
    Long countByStatus(String status);
}