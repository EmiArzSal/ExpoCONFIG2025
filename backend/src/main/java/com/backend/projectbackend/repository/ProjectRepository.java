package com.backend.projectbackend.repository;

import com.backend.projectbackend.model.Project;
import java.util.List;
import java.util.Date;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProjectRepository extends MongoRepository<Project, String> {
  List<Project> findByTitleContainingIgnoreCase(String title);
  List<Project> findByGroupContainingIgnoreCase(String group);
  List<Project> findByCareerContainingIgnoreCase(String career);
  List<Project> findBySubjectContainingIgnoreCase(String subject);
  List<Project> findByOwnerContainingIgnoreCase(String owner);
  List<Project> findByIntegrantesIn(List<String> integrantes);
  List<Project> findByGroupAndProfessorName(String group, String professorName);
  List<Project> findByProfessorName(String professorName);
  List<Project> findByFechaRegistroBetween(Date startDate, Date endDate);
}