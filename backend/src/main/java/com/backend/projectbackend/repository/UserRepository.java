package com.backend.projectbackend.repository;

import com.backend.projectbackend.model.User;
import org.springframework.stereotype.Repository;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {

}