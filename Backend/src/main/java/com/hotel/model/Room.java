package com.hotel.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "rooms")
public class Room {
	
	@Id
	private String id;
	private String number_name;
	private int floor;
	private String type;
	private String status;
	private String description;
	private float priceByNight;
	private int beds;

}