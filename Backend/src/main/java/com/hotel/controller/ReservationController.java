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

    @GetMapping("/customer/{customerId}")
    public List<Reservation> getReservationsByCustomerId(@PathVariable String customerId) {
        return reservationService.getReservationsByCustomerId(customerId);
    }

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservation();
    }
    

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationService.createReservation(reservation);
    }

    @PutMapping("/{id}")
    public void updateReservation(@PathVariable String id, @RequestBody Reservation reservation) {
        Reservation reservationSearched = reservationService.getReservationById(id);
        

        if(reservationSearched != null && reservationSearched.getId().equals(id)){

            if ( reservation.getCheckInDate() != null) {
                reservationSearched.setCheckInDate((reservation.getCheckInDate()));
            }

            if(reservation.getCheckOutDate() != null){
                reservationSearched.setCheckOutDate(reservation.getCheckOutDate());
            }

            if(reservation.getNumberGuests() != null){
                reservationSearched.setNumberGuests(reservation.getNumberGuests());
            }

            if(reservation.getRoomType() != null){
                reservationSearched.setRoomType(reservation.getRoomType());
            }

            if(reservation.getDescription() != null){
                reservationSearched.setDescription(reservation.getDescription());
            }

            
            reservationService.updateReservation(reservationSearched);
        }

    }


    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable String id){
        reservationService.deleteReservation(id);
    }



}


