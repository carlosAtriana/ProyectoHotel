package com.hotel.repository;

import com.hotel.model.Cliente;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
<<<<<<< Updated upstream
public interface ClienteRepository extends MongoRepository<Cliente, Long> {
    Cliente findByCedula(Long cedula);
    Cliente deleteBycedula(Long cedula);
=======
public interface ClienteRepository extends MongoRepository<Cliente, String> {
    boolean existsByCedula(String cedula);
>>>>>>> Stashed changes
}
