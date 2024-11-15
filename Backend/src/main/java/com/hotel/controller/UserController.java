package com.hotel.controller;


import com.hotel.model.User;
import com.hotel.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService customerService) {
        this.userService = customerService;
    }

    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUser();
    }

    @PostMapping
    public User createUser(@RequestBody User user){
        return userService.createUser(user);
    }
    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id){
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public void UpdateUser(@RequestBody User user, @PathVariable String id){
        User userBuscar = userService.getUserById(id);
        User userAux;
        if(userBuscar.getId() == id){
            user.setName(userBuscar.getName());
            userAux = userService.createUser(user);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id){
        userService.deleteUser(id);
    }

}
