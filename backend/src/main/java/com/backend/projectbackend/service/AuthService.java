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

            // Validación según el rol
        if (request.getRole().equalsIgnoreCase("alumno")) {
            if (request.getGroup() == null || request.getBoleta() == null) {
                return new ApiResponse<>(false, "Faltan datos de alumno (grupo o boleta).", null);
            }
        }
        if (request.getRole().equalsIgnoreCase("profesor")) {
            if (request.getDepartment() == null) {
                return new ApiResponse<>(false, "Falta el departamento.", null);
            }
        }

        try {
            User user = new User();
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setNombreCompleto(request.getNombreCompleto());
            user.setRole(request.getRole());

            // Solo para alumno
            user.setGroup(request.getGroup());
            user.setBoleta(request.getBoleta());

            // Solo para profesor
            user.setDepartment(request.getDepartment());


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

            userExists.setConfirmed();
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
        if (userExist.getRole() == null || !userExist.getRole().equalsIgnoreCase(request.getUserType())) {
            return new ApiResponse<>(false, "Tipo de usuario incorrecto", null);
        }

        // Verifica que el tipo de usuario coincida
        if (userExist.getRole() == null || !userExist.getRole().equalsIgnoreCase(request.getUserType())) {
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
            return new ApiResponse<>(false, "Contraseña incorrecta", null);
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
                return new ApiResponse<>(false, "User not found", null);
            }

            if(userExists.getConfirmed() == true) {
                return new ApiResponse<>(false, "Email already confirmed", null);
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
                return new ApiResponse<>(false, "User not found", null);
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
            return new ApiResponse<>(true, "Check your email to reset your password", null);
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
                return new ApiResponse<>(false, "Passwords do not match", null);
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
}
