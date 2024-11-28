package com.hotel.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Getter
@Setter
@Document(collection = "sales")
public class Sale {
	@Id
	private String id;
	private String costumer;
	private String room;
	private String description;
	private int total;
	private double iva;
	private Date date;
}
