package com.hotel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


@SpringBootApplication
@EnableMongoRepositories(basePackages = "com.hotel.repository")

public class HotelBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(HotelBackendApplication.class, args);
	}

}
