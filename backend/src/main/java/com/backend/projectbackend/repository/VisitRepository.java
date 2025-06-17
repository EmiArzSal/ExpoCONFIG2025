package com.backend.projectbackend.repository;

import com.backend.projectbackend.model.Visit;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VisitRepository extends MongoRepository<Visit, String> {
}
