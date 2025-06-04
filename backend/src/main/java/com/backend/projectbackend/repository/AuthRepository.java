package com.backend.projectbackend.repository;

import com.backend.projectbackend.model.User;
import org.springframework.stereotype.Repository;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AuthRepository extends MongoRepository<User, ObjectId> {
    /****
 * Checks if a user exists with the specified email address.
 *
 * @param email the email address to search for
 * @return true if a user with the given email exists, false otherwise
 */
boolean existsByEmail(String email);
    /****
 * Checks if a user exists with the specified boleta.
 *
 * @param boleta the boleta identifier to search for
 * @return true if a user with the given boleta exists, false otherwise
 */
boolean existsByBoleta(String boleta);
    /****
 * Checks if a user exists with the specified employee number.
 *
 * @param numeroEmpleado the employee number to search for
 * @return true if a user with the given employee number exists, false otherwise
 */
boolean existsByNumeroEmpleado(String numeroEmpleado);
    /**
 * Checks if any user exists with the specified user type.
 *
 * @param userType the user type to search for
 * @return true if at least one user with the given user type exists, false otherwise
 */
boolean existsByUserType(String userType);
    /****
 * Retrieves a user by their email address.
 *
 * @param email the email address to search for
 * @return an Optional containing the user if found, or empty if not found
 */
Optional<User> findByEmail(String email);
    /****
 * Retrieves a user by their boleta identifier.
 *
 * @param boleta the boleta value to search for
 * @return an Optional containing the user if found, or empty if not found
 */
Optional<User> findByBoleta(String boleta);
    /****
 * Retrieves a list of users whose user type matches the specified value, ignoring case sensitivity.
 *
 * @param userType the user type to match, case-insensitive
 * @return a list of users with the specified user type, or an empty list if none found
 */
List<User> findByUserTypeIgnoreCase(String userType);
}