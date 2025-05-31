package com.backend.projectbackend.dto.project;

import java.util.Date;

public class FeedbackDTO {
    private String message;
    private Date date;
    private String professorName;

    // Constructor
    public FeedbackDTO(String message, Date date, String professorName) {
        this.message = message;
        this.date = date;
        this.professorName = professorName;
    }

    // Getters y setters
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }

    public String getProfessorName() { return professorName; }
    public void setProfessorName(String professorName) { this.professorName = professorName; }

    @Override
    public String toString() {
        return "FeedbackDTO{" +
                "message='" + message + '\'' +
                ", date=" + date +
                ", professorName='" + professorName + '\'' +
                '}';
    }
}