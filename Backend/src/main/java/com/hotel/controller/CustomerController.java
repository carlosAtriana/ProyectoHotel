package com.hotel.controller;

import com.hotel.model.Customer;
import com.hotel.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public List<Customer> getAllCustomer(){
        return customerService.getAllCustomers();
    }

    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer){
        
        return customerService.createCustomer(customer);
    }
    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable String id){
        return customerService.getCustomerById(id);
    }

    @PutMapping("/{id}")
    public void updateCustomer(@RequestBody Customer customer, @PathVariable String id){
        Customer customerBuscar = customerService.getCustomerById(id);
        Customer customerAux;
        if(customerBuscar.getId() == id){
            customer.setName(customerBuscar.getName());
            customerAux = customerService.createCustomer(customer);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable String id){
        customerService.deleteCustomer(id);
    }

}
