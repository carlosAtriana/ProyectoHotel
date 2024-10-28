package com.hotel.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "usuarios")
public class Cliente {

    @Id
    private String id;
    private String nombre;
    private String email;

}
