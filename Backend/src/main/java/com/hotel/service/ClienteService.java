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

    public Cliente obtenerClientePorCedula(Long cedula) {
        return clienteRepository.findByCedula(cedula); // Asegúrate de que este método exista en el repositorio
    }

    public List<Cliente> obtenerTodosLosClientes() {
        return clienteRepository.findAll();
    }




    public Cliente guardarCliente(Cliente cliente) {
    if (clienteRepository.existsByCedula(cliente.getCedula())) {
        throw new com.hotel.validation.CedulaRepetidaException("La cédula ya está registrada. Por favor, ingrese un valor único.");
    }
    return clienteRepository.save(cliente);
}




    public void eliminarCliente(Long cedula) {
        clienteRepository.deleteBycedula(cedula);
    }
}
