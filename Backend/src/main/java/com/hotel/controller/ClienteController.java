package com.hotel.controller;

import com.hotel.model.Cliente;
import com.hotel.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/{id}")
    public Cliente obtenerPorId(@PathVariable String id){
        return clienteService.obtenerClientePorId(id);
    }

    @PutMapping("/{id}")
    public void actualizar(@RequestBody Cliente cliente, @PathVariable String id){
        Cliente clienteBuscar = clienteService.obtenerClientePorId(id);
        Cliente clienteAux;
        if(clienteBuscar.getId() == id){
            cliente.setNombre(clienteBuscar.getNombre());
            clienteAux = clienteService.guardarCliente(cliente);
        }
    }

    @DeleteMapping
    public void eliminar(@PathVariable String id){
        clienteService.eliminarCliente(id);
    }

}
