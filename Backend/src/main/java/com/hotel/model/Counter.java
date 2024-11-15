package com.hotel.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Document(collection = "counters")
public class Counter {

    @Id
    private String id;  
    private Long seq;   

   
    public Counter() {
        this.seq = 0L;  
    }

}