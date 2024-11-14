package com.hotel.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.hotel.model.Reserva;

@Repository
public interface ReservaRepository extends MongoRepository<Reserva, String>{

    
    
}
