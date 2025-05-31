package com.backend.projectbackend.dto.auth;

import com.backend.projectbackend.util.validation.PasswordMatches;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@PasswordMatches
public class AuthCreateAccountDTO {

    @NotBlank(message = "Email required")
    @Email(message = "Email not valid")
    private String email;

    @NotBlank(message = "Name required")
    @Size(max = 50, message = "El nombre del alumno debe de tener máximo 50 caracteres")
    private String nombreCompleto;

    @NotBlank(message = "Password required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @NotBlank(message = "Password required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String passwordConfirm;

    @NotBlank(message = "User type required")
    private String userType;

    @NotBlank(message = "Group required")
    @Size(min = 5, max = 5, message = "El grupo debe de tener minimo 5 caracteres")
    private String group;
    
    @NotBlank(message = "Department required")
    private String department;
    
    @NotBlank(message = "Student ID required")
    @Size(min = 10, max = 10, message = "La boleta debe de tener mínimo 10 caracteres")
    private String boleta;


    public AuthCreateAccountDTO() {}

    //Setters and getters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getNombreCompleto() { return nombreCompleto; }
    public void setNombreCompleto(String nombreCompleto) { this.nombreCompleto = nombreCompleto; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getPasswordConfirm() { return passwordConfirm; }
    public void setPasswordConfirm(String passwordConfirm) { this.passwordConfirm = passwordConfirm; }

    public String getUserType(){ return userType; }
    public void setUserType(String  userType) { this.userType = userType; }

    public String getGroup(){ return group; }
    public void setGroup(String group){ this.group = group; }

    public String getDepartment(){ return department; }
    public void setDepartamento(String department){ this.department = department; }

    public String getBoleta(){ return boleta; }
    public void setBoleta(String boleta){ this.boleta = boleta; }

    @Override
    public String toString() {
        return "AuthCreateAccountDTO{" +
                "email='" + email + '\'' +
                ", nombreCompleto='" + nombreCompleto + '\'' +
                ", password='" + password + '\'' +
                ", passwordConfirm='" + passwordConfirm + '\'' +
                ", userType='" + userType + '\'' +
                ", group='" + group + '\'' +
                ", department='" + department + '\'' +
                ", boleta='" + boleta + '\'' +
                '}';
    }
}

