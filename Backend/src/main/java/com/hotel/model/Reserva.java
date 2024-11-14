package com.hotel.model;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "Reservas")

public class Reserva {
    @Id
    private String id;
    private Date fechaEntrada;
    private Date fechaSalida;
    private int cantidadHuespedes;
    private String tipoHabitaciones;
    private String descripcion; 



}
