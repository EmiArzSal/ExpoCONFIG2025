package com.backend.projectbackend.model;
import java.util.Date;
import java.util.List;
import jakarta.validation.constraints.Size;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import com.backend.projectbackend.dto.project.FeedbackDTO;


@Document(collection = "projects")
public class Project{
  @MongoId
  private ObjectId id;
  private String projectName;
  private String title;
  private String group;
  @Size(max=250)
  private String description;
  private String career;
  private String subject;
  private String professorId; // ID del profesor
  private String professorName; // Nombre del profesor, opcional si se quiere mostrar
  private List<String> integrantes;
  private String documentUrl;
  private String status;
  private List<FeedbackDTO> feedback;
  private Date registerDate;
  private String assignedSpace;        // "Stand 15, Edificio 4"
  private String expositionDate;       // "2024-06-20"
  private String expositionTime;       // "10:30 - 12:00"
  private String posterUrl;           // URL del cartel subido
  private Integer visitorCount = 0;    // Contador de visitantes
  private String department;          // "ISC", "Ciencias Sociales", etc.
  private List<String> tags;         // Tags para categorización
  private String qrCode;            // QR Code del proyecto para registro por parte de los visitantes

  //Setters y getters
  public ObjectId getId(){
    return id;
  }

  public void setId(ObjectId id){
    this.id = id;
  }

  public String getProjectName(){
    return projectName;
  }

  public void setProjectName(String projectName){
    this.projectName = projectName;
  }

  public String getTitle(){
    return title;
  }
  public void setTitle(String title){
    this.title = title;
  }

  public String getGroup(){
    return group;
  }
  public void setGroup(String group){
    this.group = group;
  }

  public String getCareer(){
    return career;
  }

  public void setCareer(String career){
    this.career = career;
  }
  public String getSubject(){
    return subject;
  }

  public void setSubject(String subject){
    this.subject = subject;
  }

  public String getProfessorId(){
    return professorId;
  }
  public void setProfessorId(String professorId){
    this.professorId = professorId;
  }

  public String getProfessorName(){
    return professorName;
  }

  public void setProfessorName(String professorName){
    this.professorName = professorName;
  }

  public List<String> getIntegrantes(){
    return integrantes;
  }

  public void setIntegrantes(List<String> integrantes){
    this.integrantes = integrantes;
  }

  public String getDocumentUrl(){
    return documentUrl;
  }

  public void setDocumentUrl(String documentUrl){
    this.documentUrl = documentUrl;
  }

  public String getStatus(){
    return status;
  }

  public void setStatus(String status){
    this.status = status;
  }

  public List<FeedbackDTO> getFeedback(){
    return feedback;
  }

  public void setFeedback(List<FeedbackDTO> feedback){
    this.feedback = feedback;
  }

  public Date getRegisterDate(){
    return registerDate;
  }

  public void setRegisterDate(Date registerDate){
    this.registerDate = registerDate;
  }
  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getAssignedSpace(){
    return assignedSpace;
  }

  public void setAssignedSpace(String assignedSpace){
    this.assignedSpace = assignedSpace;
  }

  public String getExpositionDate(){
    return expositionDate;
  }

  public void setExpositionDate(String expositionDate){
    this.expositionDate = expositionDate;
  }

    public String getExpositionTime(){
    return expositionTime;
  }

  public void setExpositionTime(String expositionTime){
    this.expositionTime = expositionTime;
  }

  public String getPosterUrl(){
    return posterUrl;
  }

  public void setPosterUrl(String posterUrl){
    this.posterUrl = posterUrl;
  }

  public Integer getVisitorCount(){
    return visitorCount;
  }

  public void setVisitorCount(Integer visitorCount){
    this.visitorCount = visitorCount;
  }

  public String getDepartment(){
    return department;
  }

  public void setDepartment(String department){
    this.department = department;
  }

  public List<String> getTags(){
    return tags;
  }

  public void setTags(List<String> tags){
    this.tags = tags;
  }

  public String getQrCode(){
    return qrCode;
  }

  public void setQrCode(String qrCode){
    this.qrCode = qrCode;
  }


  @Override
  public String toString() {
    return "Project{" +
            "id=" + id +
            ", title='" + title + '\'' +
            ", group='" + group + '\'' +
            ", description='" + description + '\'' +
            ", career='" + career + '\'' +
            ", subject='" + subject + '\'' +
            ", professorName=" + professorName +
            ", integrantes=" + integrantes +
            ", documentUrl='" + documentUrl + '\'' +
            ", status='" + status + '\'' +
            ", feedback='" + feedback + '\'' +
            ", registerDate=" + registerDate +
            ", assignedSpace='" + assignedSpace + '\'' +
            ", expositionDate='" + expositionDate + '\'' +
            ", expositionTime='" + expositionTime + '\'' +
            ", posterUrl='" + posterUrl + '\'' +
            ", visitorCount=" + visitorCount +
            ", department='" + department + '\'' +
            ", tags=" + tags +
            ", qrCode='" + qrCode + '\'' +
            '}';
  }
}