package com.hotel.service;

import com.hotel.model.Room;
import com.hotel.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RoomService {
	private final RoomRepository roomRepository;

    @Autowired
    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public List<Room> getRooms() {
        return roomRepository.findAll();
    }

    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }

    public Room getRoomById(String id) {
        return roomRepository.findById(id).orElse(null);
    }

    public void deleteRoom(String id) {
    	roomRepository.deleteById(id);
    }
    public long countOccupiedRooms() {
        return roomRepository.countByStatus("ocupada");
    }
}
