package com.hotel.repository;

import com.hotel.model.Sale;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface SaleRepository extends MongoRepository<Sale, String>{
    //buscar por id cliente
	List<Sale> findByCostumer(String costumer);

    // Obtener ventas de este mes
    @Query("{'date': {'$gte': ?0, '$lt': ?1}}")
    List<Sale> findSalesByMonth(Date startOfMonth, Date endOfMonth);

    // Obtener ventas de esta semana
    @Query("{'date': {'$gte': ?0, '$lt': ?1}}")
    List<Sale> findSalesByWeek(Date startOfWeek, Date endOfWeek);
}
