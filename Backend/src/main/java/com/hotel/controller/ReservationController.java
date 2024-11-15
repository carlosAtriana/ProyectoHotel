package com.hotel.controller;

import org.springframework.web.bind.annotation.*;

import com.hotel.model.Reservation;
import com.hotel.service.ReservationService;

import java.util.List;


@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;

    }

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservation();
    }
    

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationService.createReservation(reservation);
    }
}
