package com.hotel.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotel.model.Reservation;
import com.hotel.repository.ReservationRepository;

@Service
public class ReservationService {
    
    private final ReservationRepository reservationRepository;
    private final CounterService counterService;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository, CounterService counterService) {
        this.reservationRepository = reservationRepository;
        this.counterService = counterService; 
    }

    public List<Reservation> getAllReservation() {
        return reservationRepository.findAll();
    }

    public Reservation createReservation(Reservation reservation) {
        // Si no tiene un número secuencial asignado, obtenemos el siguiente valor del contador
        if (reservation.getSequential() == null) {
            // Llamamos al servicio de contador para obtener el siguiente valor 
            long nextSequential = counterService.getNextSequential("reservation");
            reservation.setSequential(nextSequential); // Asignamos el valor secuencial a la reserva
        }

        // Guardamos la reserva en la base de datos
        return reservationRepository.save(reservation);
    }

    public void deleteReservation(String id) {
        reservationRepository.deleteById(id);
    }

    public Reservation getReservationById(String id) {
        return reservationRepository.findById(id).orElse(null);
    }
}
