package com.hotel.service;

import com.hotel.model.Reception;
import com.hotel.model.Room;
import com.hotel.repository.ReceptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReceptionService {

    private final ReceptionRepository receptionRepository;
    private final RoomService roomService;

    @Autowired
    public ReceptionService(ReceptionRepository receptionRepository, RoomService roomService) {
        this.receptionRepository = receptionRepository;
        this.roomService = roomService;
    }

    public List<Reception> getAllReception() {
        return receptionRepository.findAll();
    }

    public Reception createReception(Reception reception) {
        Room room = updateRoomStatus(reception.getRoom().getId());
        reception.setMontoTotal(null); // Monto total se calcula al retirar
        return receptionRepository.save(reception);
    }

    public void retirarReception(Reception reception) {
        Room room = updateRoomStatus(reception.getRoom().getId());
        Double monto = calculateTotal(reception);
        if (reception.getMontoTotal() == null) {
            reception.setMontoTotal(monto);
        }
        receptionRepository.save(reception);
    }

    private Room updateRoomStatus(String roomId) {
        Room room = roomService.getRoomById(roomId);
        room.setStatus(room.getStatus().equals("Ocupado") ? "Disponible" : "Ocupado");
        roomService.saveRoom(room);
        return room;
    }

    public Double calculateTotal(Reception reception) {
        if (reception.getCheckInDate() == null || reception.getCheckOutDate() == null) {
            throw new IllegalArgumentException("Las fechas de check-in y check-out no pueden ser nulas");
        }

        if (reception.getCheckOutDate().before(reception.getCheckInDate())) {
            throw new IllegalArgumentException("La fecha de check-out no puede ser anterior al check-in");
        }

        Room room = roomService.getRoomById(reception.getRoom().getId());

        long diffInMillies = reception.getCheckOutDate().getTime() - reception.getCheckInDate().getTime();
        long totalHours = diffInMillies / (1000 * 60 * 60);

        // Nueva validación para tiempo menor a 2 horas
        if (totalHours < 2) {
            return room.getPriceByNight() / 2.0;
        }

        long numberOfNights = totalHours / 24;
        long remainingHours = totalHours % 24;

        double additionalCharge = remainingHours > 0
                ? (remainingHours / 24.0) * room.getPriceByNight()
                : 0;

        return (numberOfNights * room.getPriceByNight()) + additionalCharge;
    }


    public void deleteReception(String id) {
        receptionRepository.deleteById(id);
    }

    public Reception getReceptionById(String id) {
        return receptionRepository.findById(id).orElse(null);
    }
}
