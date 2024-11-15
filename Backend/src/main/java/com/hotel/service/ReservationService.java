package com.hotel.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hotel.model.Reservation;
import com.hotel.repository.ReservationRepository;

@Service
public class ReservationService {
    
    private final ReservationRepository reservationRepository;

    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public List<Reservation> getAllReservation() {
        return reservationRepository.findAll();
    }

    public Reservation createReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public void deleteReservation(String id) {
        reservationRepository.deleteById(id);
    }

    
}
