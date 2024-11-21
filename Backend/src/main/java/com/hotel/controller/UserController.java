package com.hotel.controller;


import com.hotel.model.User;
import com.hotel.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<User> updateUser(@RequestBody User user, @PathVariable String id) {
        // Buscar el usuario existente
        User userBuscar = userService.getUserById(id);

        if (userBuscar == null) {
            // Si el usuario no existe, devuelve un error 404
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
        // Actualizar los campos necesarios
        userBuscar.setId(user.getId());
        userBuscar.setUserName(user.getUserName());
        userBuscar.setName(user.getName()); // Asumiendo que deseas actualizar el nombre
        userBuscar.setLastName(user.getLastName());
        userBuscar.setFullName(user.getFullName());
        userBuscar.setEmail(user.getEmail());
        userBuscar.setActive(user.getActive());
        userBuscar.setRol(user.getRol());
        User updatedUser = userService.createUser(userBuscar);

        // Retornar el usuario actualizado
        return ResponseEntity.ok(updatedUser);
    }


    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id){
        userService.deleteUser(id);
    }

}
