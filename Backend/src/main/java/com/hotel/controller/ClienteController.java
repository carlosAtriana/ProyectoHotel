package com.hotel.controller;

import com.hotel.model.Cliente;
import com.hotel.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
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
    public Cliente guardar(@RequestBody Cliente cliente){
        return clienteService.guardarCliente(cliente);
    }

    @GetMapping("/{cedula}")
    public Cliente obtenerPorId(@PathVariable Long cedula){
        return clienteService.obtenerClientePorCedula(cedula);
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
