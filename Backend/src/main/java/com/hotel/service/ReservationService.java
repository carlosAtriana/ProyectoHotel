package com.hotel.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotel.model.Customer;
import com.hotel.model.Reservation;
import com.hotel.repository.CustomerRepository;
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
        if (reservation.getSequential() == null) {
            // Llamamos al servicio de contador para obtener el siguiente valor
            long nextSequential = counterService.getNextSequential("reservation");
            reservation.setSequential(nextSequential);
        }
        return reservationRepository.save(reservation);
    }

    public void updateReservation(Reservation reservation) {
        reservationRepository.save(reservation); 
    }

    public void deleteReservation(String id) {
        reservationRepository.deleteById(id);
    }

    public Reservation getReservationById(String id) {
        return reservationRepository.findById(id).orElse(null);
    }


    public List<Reservation> getReservationsByCustomerId(String customerId) {
        return reservationRepository.findByCustomerId(customerId);
    }

}
