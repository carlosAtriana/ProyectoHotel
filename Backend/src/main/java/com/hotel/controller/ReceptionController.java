package com.hotel.controller;

import com.hotel.model.Reception;
import com.hotel.service.ReceptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/reception")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class ReceptionController {

    private final ReceptionService receptionService;

    @Autowired
    public ReceptionController(ReceptionService receptionService) {
        this.receptionService = receptionService;
    }

    @GetMapping
    public List<Reception> getAllReceptions() {
        return receptionService.getAllReception();
    }


    @PostMapping
    public Reception createReception(@RequestBody Reception Reception) {
        return receptionService.createReception(Reception);
    }

    @PutMapping("/{id}")
    public void retirarReception(@PathVariable String id, @RequestBody Reception reception) {
        Reception receptionSearched = receptionService.getReceptionById(id);

        if(receptionSearched != null && receptionSearched.getId().equals(id)){

            if(reception.getRoom().getId() != null){
                receptionSearched.setRoom(reception.getRoom());
            }
            if(reception.getCustomer() != null){
                receptionSearched.setCustomer(reception.getCustomer());
            }
            if ( reception.getCheckInDate() != null) {
                receptionSearched.setCheckInDate((reception.getCheckInDate()));
            }

            if(reception.getCheckOutDate() != null){
                receptionSearched.setCheckOutDate(reception.getCheckOutDate());
            }
            receptionService.retirarReception(receptionSearched);
        }
    }
    @DeleteMapping("/{id}")
    public void deleteReception(@PathVariable String id){
        receptionService.deleteReception(id);
    }

}
