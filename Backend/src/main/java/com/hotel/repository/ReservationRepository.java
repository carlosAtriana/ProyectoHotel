package com.hotel.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.hotel.model.Reservation;

@Repository
public interface ReservationRepository extends MongoRepository<Reservation, String>{

    List<Reservation> findByCustomerId(String customerId);
    
}
