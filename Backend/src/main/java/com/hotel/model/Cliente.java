package com.hotel.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "usuarios")
public class Cliente {

<<<<<<< Updated upstream
    private Long cedula;
=======
    @Id
    private String id;
    @NotNull(message = "La cédula no puede ser nula")
    @Indexed(unique = true)
    private String cedula;
    @NotNull(message = "El nombre no puede ser nulo")
    @NotBlank(message = "no puede estar vació")
>>>>>>> Stashed changes
    private String nombre;
    @NotNull(message = "El email no puede ser nulo")
    @Email(message = "Debe proporcionar un correo electrónico válido")
    private String email;

}
