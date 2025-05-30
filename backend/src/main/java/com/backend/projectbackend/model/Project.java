package com.backend.projectbackend.model;
import java.util.Date;
import java.util.List;
import jakarta.validation.constraints.Size;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;


@Document(collection = "projects")
public class Project{
  @MongoId
  private ObjectId id;
  private String title;
  private String group;

  @Size(max=250)
  private String description;
  private String career;
  private String subject;
  private String professorName;
  private String owner;
  private List<String> integrantes;
  private String documentUrl;
  private String status;
  private String feedback;
  private Date registerDate;

  //Setters y getters
  public ObjectId getId(){
    return id;
  }

  public void setId(ObjectId id){
    this.id = id;
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

  public String getProfessorName(){
    return professorName;
  }

  public void setProfessorName(String professorName){
    this.professorName = professorName;
  }

  public String getOwner(){
    return owner;
  }

  public void setOwner(String owner){
    this.owner = owner;
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

  public String getFeedback(){
    return feedback;
  }

  public void setFeedback(String feedback){
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
            ", owner='" + owner + '\'' +
            ", integrantes=" + integrantes +
            ", documentUrl='" + documentUrl + '\'' +
            ", status='" + status + '\'' +
            ", feedback='" + feedback + '\'' +
            ", registerDate=" + registerDate +
            '}';
  }
}