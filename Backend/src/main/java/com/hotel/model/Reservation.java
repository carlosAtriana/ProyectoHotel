package com.hotel.model;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "reservation")

public class Reservation {
    @Id
    private String id;
    private Date checkInDate;
    private Date checkOutDate;
    private int numberGuests;
    private String roomType;
    private String description;

}
