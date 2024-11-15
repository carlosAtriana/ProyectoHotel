package com.hotel.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.stereotype.Service;

import com.hotel.model.Counter;

@Service
public class CounterService {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public CounterService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public long getNextSequential(String counterName) {
        // Buscamos el contador por nombre
        Query query = new Query(Criteria.where("id").is(counterName)); 
        Update update = new Update().inc("seq", 1);  // Incrementamos el valor 'seq'
        
        // Usamos 'findAndModify' para encontrar y actualizar el contador atomically
        Counter counter = mongoTemplate.findAndModify(query, update, 
                FindAndModifyOptions.options().returnNew(true).upsert(true), Counter.class);
        
        // Si se encontró un contador, devolvemos el valor secuencial, si no, retornamos 1
        return counter != null ? counter.getSeq() : 1;
    }
}