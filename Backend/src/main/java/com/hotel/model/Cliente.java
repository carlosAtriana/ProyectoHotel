package com.hotel.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "usuarios")
public class Cliente {

    private Long cedula;
    private String nombre;
    private String email;

}
