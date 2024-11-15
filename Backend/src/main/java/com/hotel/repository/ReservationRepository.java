package com.hotel.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.hotel.model.Reservation;

@Repository
public interface ReservationRepository extends MongoRepository<Reservation, String>{

    
    
}
