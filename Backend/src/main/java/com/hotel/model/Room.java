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

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getBeds() {
		return beds;
	}

	public void setBeds(int beds) {
		this.beds = beds;
	}

	public float getPriceByNight() {
		return priceByNight;
	}

	public void setPriceByNight(float priceByNight) {
		this.priceByNight = priceByNight;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getFloor() {
		return floor;
	}

	public void setFloor(int floor) {
		this.floor = floor;
	}

	public String getNumber_name() {
		return number_name;
	}

	public void setNumber_name(String number_name) {
		this.number_name = number_name;
	}
}