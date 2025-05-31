package com.backend.projectbackend.dto.project;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ProjectCreateDTO {
    @NotBlank(message = "Title is required")
    @Size(max = 100, message = "Title must be less than 100 characters")
    private String title;

    @NotBlank(message = "Owner is required")
    @Size(max = 50, message = "Owner must be less than 50 characters")
    private String owner;

    @Size(max = 50, message = "Integrantes must be less than 50 characters")
    private List<String> integrantes;

    @NotBlank(message = "Group is required")
    @Size(max = 4, message = "Group must be maximum 4 characters")
    @jakarta.validation.constraints.Pattern(regexp = "^[1-8][ABC][MV][1-6]$", message = "Group must match the format (e.g., 1CM1, 2CV2, 3AM3, 4AV4)")
    private String group;

    @NotBlank(message = "Professor is required")
    @Size(max = 100, message = "Professor must be less than 100 characters")
    @jakarta.validation.constraints.Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Professor name must contain only letters and spaces")
    private String professorName;

    @Size(max = 250, message = "Description must be less than 250 characters")
    private String description;

    @NotBlank(message = "Career is required")
    @Size(max = 50, message = "Career must be less than 50 characters")
    private String career;

    @NotBlank(message = "Subject is required")
    @Size(max = 50, message = "Subject must be less than 50 characters")
    private String subject;

    
    @NotBlank(message = "Register date is required")
    private Date registerDate;


    private String documentUrl; // URL del documento del proyecto


    public ProjectCreateDTO() {
        this.title = "";
        this.group = "";
        this.description = "";
        this.career = "";
        this.subject = "";
        this.integrantes = new ArrayList<>();
        this.professorName = "";
        this.documentUrl = "";
        this.registerDate = new Date();
    }


    // Setters and getters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCareer() {
        return career;
    }

    public void setCareer(String career) {
        this.career = career;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getOwner() {
        return owner;
    }
    public void setOwner(String owner) {
        this.owner = owner;
    }
    public String getProfessorName() {
        return professorName;
    }
    public void setProfessorName(String professorName) {
        this.professorName = professorName;
    }
    public List<String> getIntegrantes() {
        return integrantes;
    }
    public void setIntegrantes(List<String> integrantes) {
        this.integrantes = integrantes;
    }

    public Date getRegisterDate(){
        return registerDate;
    }

    public void setRegisterDate(Date registerDate){
        this.registerDate = registerDate;
    }

    public String getDocumentUrl() {
        return documentUrl;
    }

    public void setDocumentUrl(String documentUrl) {
        this.documentUrl = documentUrl;
    }

    @Override
    public String toString() {
        return "ProjectCreateDTO{" +
                "title='" + title + '\'' +
                ", group='" + group + '\'' +
                ", description='" + description + '\'' +
                ", career='" + career + '\'' +
                ", subject='" + subject + '\'' +
                ", integrantes=" + integrantes +
                ", professorName='" + professorName + '\'' +
                ", documentUrl='" + documentUrl + '\'' +
                ", registerDate=" + registerDate +
                '}';
    }
}