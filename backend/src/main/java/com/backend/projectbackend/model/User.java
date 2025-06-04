package com.backend.projectbackend.model;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document(collection = "users")
public class User {
    @MongoId
    private ObjectId id;

    @NotBlank
    private String nombreCompleto;

    @NotBlank
    private String userType;

    @NotBlank
    private String password;

    @NotBlank
    private String group;

    private String department;

    @NotBlank
    private String boleta;

    @Email
    @NotBlank
    private String email;

    private Boolean confirmed = false; //Agregar valor por default
    private Boolean admin = false;

    @NotBlank
    private String numeroEmpleado;


    /**
 * Creates a new User instance with default values.
 */
public User() {}

    /**
     * Constructs a User instance with the specified details.
     *
     * @param nombreCompleto the user's full name
     * @param password the user's password
     * @param email the user's email address
     * @param token unused parameter
     * @param confirmed whether the user's account is confirmed
     * @param admin whether the user has admin privileges
     * @param userType the type of user
     * @param group the user's group
     * @param boleta the user's identifier
     * @param department the user's department
     * @param numeroEmpleado the user's employee number
     */
    public User(String nombreCompleto, String password, String email, String token, Boolean confirmed,Boolean admin, String userType, String group, String boleta, String department, String numeroEmpleado) {
        this.nombreCompleto = nombreCompleto;
        this.password = password;
        this.userType = userType;
        this.department = department;
        this.group = group;
        this.boleta = boleta;
        this.email = email;
        this.confirmed = confirmed;
        this.admin = admin;
    }

    //Getters and setters
    public ObjectId getId() { return id; }
    public void setId(ObjectId id) { this.id = id; }

    public String getNombreCompleto() { return nombreCompleto; }
    public void setNombreCompleto(String nombreCompleto) { this.nombreCompleto = nombreCompleto; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    /**
 * Returns the user's email address.
 *
 * @return the email associated with the user
 */
public String getEmail() { return email; }
    /**
 * Sets the user's email address.
 *
 * @param email the email address to assign to the user
 */
public void setEmail(String email) { this.email = email; }

    /**
 * Returns whether the user has administrative privileges.
 *
 * @return true if the user is an admin, false otherwise
 */
public Boolean getAdmin() { return admin; }
    /**
 * Sets the admin status of the user.
 *
 * @param admin true if the user is an admin, false otherwise
 */
public void setAdmin(Boolean admin) { this.admin = admin; }

    public String getUserType(){ return userType; }
    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getBoleta(){ return boleta; }
    public void setBoleta(String boleta) {
        this.boleta = boleta;
    }

    public String getGroup(){ return group; }
    public void setGroup(String group) {
        this.group = group;
    }

    public String getDepartment(){ return department; }
    /****
     * Sets the department associated with the user.
     *
     * @param department the department to assign to the user
     */
    public void setDepartment(String department) {
        this.department = department;
    }
    /**
     * Sets the confirmation status of the user.
     *
     * @param confirmed true if the user is confirmed; false otherwise
     */
    public void setConfirmed(Boolean confirmed) {
        this.confirmed = confirmed;
    }
    /**
     * Returns the confirmation status of the user.
     *
     * @return true if the user is confirmed; false otherwise
     */
    public Boolean getConfirmed() {
        return confirmed;
    }
    /**
     * Returns the employee number associated with the user.
     *
     * @return the user's employee number
     */
    public String getNumeroEmpleado() {
        return numeroEmpleado;
    }

    /****
     * Sets the employee number for the user.
     *
     * @param numeroEmpleado the employee number to assign
     */
    public void setNumeroEmpleado(String numeroEmpleado) {
        this.numeroEmpleado = numeroEmpleado;
    }

    /****
             * Returns a string representation of the User object, including id, userType, nombreCompleto, email, and confirmed status.
             *
             * @return a string summarizing key User fields
             */
            @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", userType='" + userType + '\'' +
                ", nombreCompleto='" + nombreCompleto + '\'' +
                ", email='" + email + '\'' +
                ", confirmed=" + confirmed +
                '}';
            }

}
