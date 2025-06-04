package com.backend.projectbackend.service;

//Service - logic

import com.backend.projectbackend.dto.auth.*;
import com.backend.projectbackend.model.Token;
import com.backend.projectbackend.model.User;
import com.backend.projectbackend.repository.AuthRepository;
import com.backend.projectbackend.repository.TokenRepository;
import com.backend.projectbackend.util.email.EmailService;
import com.backend.projectbackend.util.responses.ApiResponse;
import com.backend.projectbackend.util.token.JwtUtil;
import com.backend.projectbackend.util.token.TokenGenerator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class AuthService {
    private final AuthRepository authRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final TokenRepository tokenRepository;
    private final JwtUtil jwtUtil;

    public AuthService(AuthRepository authRepository, PasswordEncoder passwordEncoder, EmailService emailService, TokenRepository tokenRepository, JwtUtil jwtUtil) {
        this.authRepository = authRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
        this.tokenRepository = tokenRepository;
        this.jwtUtil = jwtUtil;
    }

    
    public ApiResponse<String> createAccount(AuthCreateAccountDTO request) {
        if (authRepository.existsByEmail(request.getEmail())) {
            return new ApiResponse<>(false, "El correo ya está registrado.", null);
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setNombreCompleto(request.getNombreCompleto());
        user.setUserType(request.getUserType());

        // Validación según el rol
        if (request.getUserType().equalsIgnoreCase("estudiante")) {
            user.setGroup(request.getGroup());
            user.setBoleta(request.getBoleta());
            user.setDepartment(null);
            user.setNumeroEmpleado(null);

            if (request.getGroup() == null || request.getBoleta() == null) {
                return new ApiResponse<>(false, "Faltan datos de alumno (grupo o boleta).", null);
            }
            if (authRepository.existsByBoleta(request.getBoleta())) {
                return new ApiResponse<>(false, "La boleta ya está registrada.", null);
            }
        }
        if (request.getUserType().equalsIgnoreCase("profesor")) {
            user.setGroup(null);
            user.setBoleta(null);
            user.setDepartment(request.getDepartment());
            user.setNumeroEmpleado(request.getNumeroEmpleado());
            if (request.getDepartment() == null) {
                return new ApiResponse<>(false, "Falta el departamento.", null);
            }
            if (authRepository.existsByEmail(request.getEmail())) {
                return new ApiResponse<>(false, "El correo ya está registrado.", null);
            }
            if (request.getNumeroEmpleado() == null) {
                return new ApiResponse<>(false, "Falta el número de empleado.", null);
            }
            if(authRepository.existsByNumeroEmpleado(request.getNumeroEmpleado())) {
                return new ApiResponse<>(false, "El número de empleado ya está registrado.", null);
            }
        }

        try {

            authRepository.save(user);

            Token token = new Token();
            String generatedToken = TokenGenerator.generateToken();
            token.setTokenValue(generatedToken);
            token.setUserId(user.getId());

            tokenRepository.save(token);

            emailService.sendConfirmationEmail(
                    user.getEmail(),
                    user.getNombreCompleto(),
                    token.getTokenValue()
            );
            return new ApiResponse<>(true, "Te enviamos un correo de confirmación.", null);
        } catch (Exception e) {
            e.printStackTrace(); // Puedes registrar con un logger en vez de imprimir
            return new ApiResponse<>(false, "Error interno del servidor: " + e.getMessage(), null);
        }
    }

    public ApiResponse<String> confirmAccount(AuthConfirmAccountDTO request) {
        try{
            Token tokenExists = tokenRepository.findByTokenValue(request.getToken());
            if (tokenExists == null) {
                return new ApiResponse<>(false, "Invalid token", null);
            }

            User userExists = authRepository.findById(tokenExists.getUserId()).get();
            if (userExists == null) {
                return new ApiResponse<>(false, "User not found", null);
            }

            userExists.setConfirmed(true);
            authRepository.save(userExists);
            tokenRepository.delete(tokenExists);
            return new ApiResponse<>(true, "Account confirmed", null);
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false, "Internal server error: " + e.getMessage(), null);
        }
    }

    public ApiResponse<String> login(AuthLoginDTO request) {
    try {
        // Busca el usuario por email
        Optional<User> userOpt = authRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) {
            return new ApiResponse<>(false, "Usuario no encontrado", null);
        }
        User userExist = userOpt.get();

        // Verifica que el tipo de usuario coincida
        if (userExist.getUserType() == null || !userExist.getUserType().equalsIgnoreCase(request.getUserType())) {
            return new ApiResponse<>(false, "Tipo de usuario incorrecto", null);
        }

        // Verifica si la cuenta está confirmada
        if (!userExist.getConfirmed()) {
            Token token = new Token();
            String generatedToken = TokenGenerator.generateToken();
            token.setTokenValue(generatedToken);
            token.setUserId(userExist.getId());
            emailService.sendConfirmationEmail(
                    userExist.getEmail(),
                    userExist.getNombreCompleto(),
                    token.getTokenValue()
            );
            tokenRepository.save(token);
            return new ApiResponse<>(false, "Cuenta no confirmada, revisa tu correo", null);
        }

        // Verifica la contraseña correctamente
        if (!passwordEncoder.matches(request.getPassword(), userExist.getPassword())) {
            return new ApiResponse<>(false, "Password incorrecto", null);
        }

        // Genera el token (o la respuesta que uses)
        String token = jwtUtil.generateToken(userExist.getId().toString(), userExist.getAdmin());
        return new ApiResponse<>(true, "¡Bienvenido!", token);
    } catch (Exception e) {
        e.printStackTrace();
        return new ApiResponse<>(false, "Error interno del servidor: " + e.getMessage(), null);
    }
}

    public ApiResponse<String> requestCode(RequestCodeDTO request) {
        try{
            User userExists = authRepository.findByEmail(request.getEmail()).get();
            if (userExists == null) {
                return new ApiResponse<>(false, "Usuario no encontrado", null);
            }

            if(userExists.getConfirmed() == true) {
                return new ApiResponse<>(false, "El correo ya está confirmado", null);
            }

            Token token = new Token();
            String generatedToken = TokenGenerator.generateToken();
            token.setTokenValue(generatedToken);
            token.setUserId(userExists.getId());

            tokenRepository.save(token);
            authRepository.save(userExists);

            emailService.sendConfirmationEmail(
                    userExists.getEmail(),
                    userExists.getNombreCompleto(),
                    token.getTokenValue()
            );

            return new ApiResponse<>(true, "Confirmation email sent", null);
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false, "Internal server error: " + e.getMessage(), null);
        }
    }

    public ApiResponse<String> reqPassResetCode(ReqPassResetCodeDTO request) {
        try{
            User userExists = authRepository.findByEmail(request.getEmail()).get();
            if (userExists == null) {
                return new ApiResponse<>(false, "Usuario no encontrado", null);
            }
            Token token = new Token();
            String generatedToken = TokenGenerator.generateToken();
            token.setTokenValue(generatedToken);
            token.setUserId(userExists.getId());

            tokenRepository.save(token);
            authRepository.save(userExists);

            emailService.sendResetPasswordEmail(
                    userExists.getEmail(),
                    userExists.getNombreCompleto(),
                    token.getTokenValue()
            );
            return new ApiResponse<>(true, "Revisa tu correo para restablecer tu contraseña", null);
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false, "Internal server error: " + e.getMessage(), null);
        }
    }

    public ApiResponse<String> validateToken(AuthConfirmAccountDTO request) {
        try{
            Token tokenExists = tokenRepository.findByTokenValue(request.getToken());
            if (tokenExists == null) {
                return new ApiResponse<>(false, "Invalid token", null);
            }
            return new ApiResponse<>(true, "Valid token", null);
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false, "Internal server error: " + e.getMessage(), null);
        }
    }

    public ApiResponse<String> updatePassword(String token, UpdatePasswordDTO request) {
        try{
            Token tokenExists = tokenRepository.findByTokenValue(token);
            if (tokenExists == null) {
                return new ApiResponse<>(false, "Invalid token", null);
            }
            if (!request.getNewPassword().equals(request.getConfirmPassword())) {
                return new ApiResponse<>(false, "Las contraseñas no coinciden", null);
            }

            User user = authRepository.findById(tokenExists.getUserId()).get();
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            authRepository.save(user);
            tokenRepository.delete(tokenExists);

            return new ApiResponse<>(true, "Password update", null);
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(false, "Internal server error: " + e.getMessage(), null);
        }
    }

    public ApiResponse<String> createAdminAccount(AuthCreateAccountDTO request) {
        // Verifica si ya existe un usuario con ese email
        if (authRepository.existsByEmail(request.getEmail())) {
            return new ApiResponse<>(false, "El correo ya está registrado.", null);
        }
        // Crea el usuario con userType ADMIN y contraseña hasheada
        User user = new User();
        user.setNombreCompleto(request.getNombreCompleto());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUserType("ADMIN");
        // Para administradores, marcamos como confirmado directamente
        user.setConfirmed(true); // Opcional: puedes requerir confirmación por correo si lo deseas
        user.setAdmin(true); // Marca al usuario como administrador
        user.setGroup(null); // No aplica para administradores
        user.setBoleta(null); // No aplica para administradores
        user.setDepartment(null); // No aplica para administradores
        user.setNumeroEmpleado(null); // No aplica para administradores

        authRepository.save(user);
        return new ApiResponse<>(true, "Administrador creado exitosamente.", null);
    }

    public List<User> getAllAdmins() {
        return authRepository.findByUserTypeIgnoreCase("ADMIN");
    }

    public ApiResponse<String> deleteAdminById(String id) {
        try {
            Optional<User> userOptional = authRepository.findById(new org.bson.types.ObjectId(id));
            if (userOptional.isEmpty()) {
                return new ApiResponse<>(false, "Administrador no encontrado", null);
            }
            User user = userOptional.get();
            if (!user.getAdmin()) {
                return new ApiResponse<>(false, "El usuario no es un administrador", null);
            }
            authRepository.deleteById(new org.bson.types.ObjectId(id));
            return new ApiResponse<>(true, "Administrador eliminado exitosamente", null);
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiResponse<>(false, "Error interno del servidor: " + e.getMessage(), null);
        }
    }
}
