package com.hotel.service;

import com.hotel.model.Cliente;
import com.hotel.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    @Autowired
    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Cliente> obtenerTodosLosClientes() {
        return clienteRepository.findAll();
    }

    public Cliente guardarCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public Cliente obtenerClientePorId(String id) {
        return clienteRepository.findById(id).orElse(null);
    }

    public void eliminarCliente(String id) {
        clienteRepository.deleteById(id);
    }
}
