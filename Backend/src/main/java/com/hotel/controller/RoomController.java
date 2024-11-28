package com.hotel.controller;

import com.hotel.model.Room;
import com.hotel.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)

public class RoomController {
	private final RoomService roomService;

    @Autowired
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    public List<Room> getRooms(){
        return roomService.getRooms();
    }

    @PostMapping
    public Room saveRoom(@RequestBody Room room){
        return roomService.saveRoom(room);
    }

    @GetMapping("/{id}")
    public Room getRoomById(@PathVariable String id){
        return roomService.getRoomById(id);
    }

    @PutMapping("/{id}")
    public void updateRoom(@RequestBody Room room, @PathVariable String id){
    	Room findRoom = roomService.getRoomById(id);
    	Room roomAux;
        if(findRoom.getId().equals(id)){
            findRoom.setId(room.getId());
            roomAux = roomService.saveRoom(room);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteRoom(@PathVariable String id){
        roomService.deleteRoom(id);
    }

    @GetMapping("/count/occupied")
    public long contarHabitacionesOcupadas() {
        return roomService.countOccupiedRooms();
    }

}
