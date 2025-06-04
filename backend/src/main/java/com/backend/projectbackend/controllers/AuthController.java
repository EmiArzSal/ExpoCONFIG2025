package com.backend.projectbackend.controllers;

//Controller - ENDPOINTS

import com.backend.projectbackend.dto.auth.*;
import com.backend.projectbackend.model.User;
import com.backend.projectbackend.service.AuthService;
import com.backend.projectbackend.util.responses.ApiResponse;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final com.backend.projectbackend.repository.AuthRepository authRepository;

    /**
     * Constructs an AuthController with the specified authentication service and authentication repository dependencies.
     */
    public AuthController(AuthService authService, com.backend.projectbackend.repository.AuthRepository authRepository) {
        this.authService = authService;
        this.authRepository = authRepository;
    }

    /****
     * Handles user account creation requests.
     *
     * Accepts a validated account creation request and delegates to the authentication service to create a new user account. Returns HTTP 201 with a success message on successful creation, or HTTP 400 with an error message if account creation fails.
     *
     * @param request the account creation details
     * @return HTTP 201 with success message, or HTTP 400 with error message
     * @throws MessagingException if an error occurs while sending confirmation email
     * @throws UnsupportedEncodingException if encoding is not supported during email processing
     */
    @PostMapping("/create-account")
    public ResponseEntity<ApiResponse<String>> createAccount(@Valid @RequestBody AuthCreateAccountDTO request) throws MessagingException, UnsupportedEncodingException {
        ApiResponse<String> response = authService.createAccount(request);
        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.status(201).body(response);
    }

    @PostMapping("/confirm-account")
    public ResponseEntity<ApiResponse<String>> confirmAccount(@Valid @RequestBody AuthConfirmAccountDTO request) throws MessagingException, UnsupportedEncodingException {
        ApiResponse<String> response = authService.confirmAccount(request);
        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.status(201).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<String>> login(@Valid @RequestBody AuthLoginDTO request) throws MessagingException, UnsupportedEncodingException {
        ApiResponse<String> response = authService.login(request);
        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.status(201).body(response);
    }

    @PostMapping("/request-code")
    public ResponseEntity<ApiResponse<String>> requestCode(@Valid @RequestBody RequestCodeDTO request) throws MessagingException, UnsupportedEncodingException {
        ApiResponse<String> response = authService.requestCode(request);
        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.status(201).body(response);
    }

    @PostMapping("/req-passreset-code")
    public ResponseEntity<ApiResponse<String>> reqPassResetCode(@Valid @RequestBody ReqPassResetCodeDTO request) throws MessagingException, UnsupportedEncodingException {
        ApiResponse<String> response = authService.reqPassResetCode(request);
        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.status(201).body(response);
    }

    @PostMapping("/update-password/{id}")
    public ResponseEntity<ApiResponse<String>> updatePassword(@PathVariable String token, @Valid @RequestBody UpdatePasswordDTO request, @PathVariable String id) throws MessagingException, UnsupportedEncodingException {
        ApiResponse<String> response = authService.updatePassword(token, request);
        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.status(201).body(response);
    }

    /**
     * Validates an account confirmation token.
     *
     * @param request the account confirmation data containing the token to validate
     * @return HTTP 201 with a success message if the token is valid, or HTTP 400 with an error message if invalid
     * @throws MessagingException if an error occurs during messaging operations
     * @throws UnsupportedEncodingException if encoding is not supported during processing
     */
    @PostMapping("/validate-token")
    public ResponseEntity<ApiResponse<String>> validateToken(@Valid @RequestBody AuthConfirmAccountDTO request) throws MessagingException, UnsupportedEncodingException {
        ApiResponse<String> response = authService.validateToken(request);
        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.status(201).body(response);
    }

    /**
     * Creates a new admin account.
     *
     * Handles POST requests to "/create-admin" and requires ADMIN authority. Accepts a validated admin account creation request and returns a response indicating success or failure.
     *
     * @return HTTP 201 with success message if the admin account is created, or HTTP 400 with error details on failure.
     */
    @PostMapping("/create-admin")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ApiResponse<String>> createAdmin(@Valid @RequestBody AuthCreateAccountDTO request) {
        ApiResponse<String> response = authService.createAdminAccount(request);
        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.status(201).body(response);
    }

    /**
     * Retrieves information about the currently authenticated user.
     *
     * @param authentication the authentication context containing the user's principal
     * @return a ResponseEntity containing a UserDTO representation of the authenticated user
     */
    @GetMapping("/user")
    public ResponseEntity<?> getUserInfo(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(new UserDTO(user));
    }

    /**
     * Retrieves a list of all admin users.
     *
     * @return a response entity containing a map with the key "admins" and a list of UserDTOs representing admin users
     */
    @GetMapping("/admins")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getAllAdmins() {
    List<User> admins = authService.getAllAdmins();
    // Puedes mapear a un DTO si no quieres exponer toda la entidad User
    List<UserDTO> adminDTOs = admins.stream().map(UserDTO::new).toList();
    return ResponseEntity.ok(Map.of("admins", adminDTOs));
    }

    /**
     * Deletes an admin user by their unique identifier.
     *
     * Only users with ADMIN authority can access this endpoint. Returns a success or failure response based on whether the admin user was deleted.
     *
     * @param id the unique identifier of the admin user to delete
     * @return a response entity containing the result of the deletion operation
     */
    @DeleteMapping("/delete-admin/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteAdmin(@PathVariable String id) {
        ApiResponse<String> response = authService.deleteAdminById(id);
        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }
}

