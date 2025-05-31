package com.backend.projectbackend.dto.project;

import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;

public class ProjectResponseDTO {
    private ObjectId id;
    private String title;
    private String group;
    private String description;
    private String career;
    private String subject;
    private List<String> integrantes;
    private String professorName; // o profesorName si prefieres mostrar el nombre
    private String documentUrl;
    private String status;
    private List<FeedbackDTO> feedback;
    private Date registerDate;

    // Constructor vacío
    public ProjectResponseDTO() {}

    // Constructor con todos los campos
    public ProjectResponseDTO(ObjectId id, String title, String group, String description, String career, String subject, List<String> integrantes, String professorName, String documentUrl, String status, List<FeedbackDTO> feedback, Date registerDate) {
        this.id = id;
        this.title = title;
        this.group = group;
        this.description = description;
        this.career = career;
        this.subject = subject;
        this.integrantes = integrantes;
        this.professorName = professorName;
        this.documentUrl = documentUrl;
        this.status = status;
        this.feedback = feedback;
        this.registerDate = registerDate;
    }

    // Getters y setters
    public ObjectId getId() { return id; }
    public void setId(ObjectId id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getGroup() { return group; }
    public void setGroup(String group) { this.group = group; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCareer() { return career; }
    public void setCareer(String career) { this.career = career; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public List<String> getIntegrantes() { return integrantes; }
    public void setIntegrantes(List<String> integrantes) { this.integrantes = integrantes; }

    public String getProfessorName() { return professorName; }
    public void setProfessorName(String professorName) { this.professorName = professorName; }

    public String getDocumentUrl() { return documentUrl; }
    public void setDocumentUrl(String documentUrl) { this.documentUrl = documentUrl; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public List<FeedbackDTO> getFeedback() { return feedback; }
    public void setFeedback(List<FeedbackDTO> feedback) { this.feedback = feedback; }

    public Date getRegisterDate() { return registerDate; }
    public void setRegisterDate(Date registerDate) { this.registerDate = registerDate; }
}