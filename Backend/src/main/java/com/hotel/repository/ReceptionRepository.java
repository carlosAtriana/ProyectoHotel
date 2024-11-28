package com.hotel.repository;

import com.hotel.model.Reception;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReceptionRepository extends MongoRepository<Reception, String> {
}
