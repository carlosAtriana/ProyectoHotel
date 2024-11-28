package com.hotel.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Getter
@Setter
@Document(collection = "reception")
public class Reception {
    @Id
    private String id;
    private Room room;
    private Customer customer;
    private Date checkInDate;
    private Date checkOutDate;
    private Double montoTotal;
}
