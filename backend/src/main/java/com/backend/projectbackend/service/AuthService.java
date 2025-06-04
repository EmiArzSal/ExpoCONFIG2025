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

    
    /**
     * Creates a new user account for either a student or professor, performing role-specific validation and sending a confirmation email.
     *
     * Validates required fields and checks for duplicate email, boleta, or employee number as appropriate for the user type. Upon successful creation, generates a confirmation token and sends a confirmation email to the user.
     *
     * @param request the account creation details, including user type and relevant fields
     * @return an ApiResponse indicating success or failure, with an appropriate message
     */
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

    /**
     * Confirms a user account using a provided confirmation token.
     *
     * Validates the token, marks the associated user as confirmed, deletes the token, and returns a response indicating success or failure.
     *
     * @param request the confirmation token request containing the token value
     * @return an ApiResponse indicating whether the account was successfully confirmed or the reason for failure
     */
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

    /**
     * Updates a user's password using a valid reset token.
     *
     * Validates the provided token and ensures the new password matches its confirmation.
     * If successful, updates the user's password and invalidates the token.
     *
     * @param token the password reset token
     * @param request contains the new password and its confirmation
     * @return an ApiResponse indicating success or failure of the password update
     */
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

    /**
     * Creates a new administrator account with the provided details.
     *
     * The account is marked as confirmed and assigned administrator privileges upon creation.
     *
     * @param request the account creation details for the administrator
     * @return an ApiResponse indicating success or failure with a relevant message
     */
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

    /**
     * Retrieves all users with the admin role.
     *
     * @return a list of users whose userType is "ADMIN"
     */
    public List<User> getAllAdmins() {
        return authRepository.findByUserTypeIgnoreCase("ADMIN");
    }

    /**
     * Updates the details of an existing administrator account by ID.
     *
     * If the user with the specified ID exists and is an administrator, updates their name, email, password, and confirmation status.
     *
     * @param id the unique identifier of the administrator to update
     * @param request the new account details for the administrator
     * @return an ApiResponse indicating success or failure with a relevant message
     */
    public ApiResponse<String> updateAdminAccount(String id, AuthCreateAccountDTO request) {
        try {
            Optional<User> userOptional = authRepository.findById(new org.bson.types.ObjectId(id));
            if (userOptional.isEmpty()) {
                return new ApiResponse<>(false, "Administrador no encontrado", null);
            }
            User user = userOptional.get();
            if (!user.getAdmin()) {
                return new ApiResponse<>(false, "El usuario no es un administrador", null);
            }

            // Actualiza los campos del administrador
            user.setNombreCompleto(request.getNombreCompleto());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setUserType("ADMIN");
            user.setConfirmed(true); // Asumimos que el administrador ya está confirmado
            authRepository.save(user);

            return new ApiResponse<>(true, "Administrador actualizado exitosamente", null);
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiResponse<>(false, "Error interno del servidor: " + e.getMessage(), null);
        }
    }

    /**
     * Deletes an administrator user by their ID.
     *
     * @param id the unique identifier of the administrator to delete
     * @return an ApiResponse indicating success or failure with a relevant message
     */
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
