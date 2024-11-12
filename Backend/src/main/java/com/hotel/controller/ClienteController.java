package com.hotel.controller;

import com.hotel.model.Cliente;
import com.hotel.service.ClienteService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
public class ClienteController {

    private final ClienteService clienteService;

    @Autowired
    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public List<Cliente> listar(){
        return clienteService.obtenerTodosLosClientes();
    }



    @PostMapping
    public ResponseEntity<Cliente> guardar(@Valid @RequestBody Cliente cliente) {
        Cliente clienteGuardado = clienteService.guardarCliente(cliente);
        return new ResponseEntity<>(clienteGuardado, HttpStatus.CREATED);
    }

<<<<<<< Updated upstream
    @GetMapping("/{cedula}")
    public Cliente obtenerPorId(@PathVariable Long cedula){
        return clienteService.obtenerClientePorCedula(cedula);
=======

    @GetMapping("/{id}")
    public Cliente obtenerPorId(@PathVariable String id){
        return clienteService.obtenerClientePorId(id);
>>>>>>> Stashed changes
    }

    @PutMapping("/{cedula}")
    public ResponseEntity<String> actualizarCliente(@PathVariable Long cedula, @RequestBody Cliente cliente) {
    Cliente clienteExistente = clienteService.obtenerClientePorCedula(cedula);

    if (clienteExistente == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente no encontrado");
    }
    clienteService.guardarCliente(cliente);
    return ResponseEntity.ok("Cliente actualizado exitosamente");
}

    @DeleteMapping
    public void eliminar(@PathVariable Long cedula){
        clienteService.eliminarCliente(cedula);
    }

}
