package com.hotel.controller;

import com.hotel.model.Sale;
import com.hotel.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class SaleController {
	private final SaleService saleService;

    @Autowired
    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @GetMapping
    public List<Sale> getSales(){
        return saleService.getSales();
    }

    @PostMapping
    public Sale createSale(@RequestBody Sale sale){
        return saleService.createSale(sale);
    }

    @GetMapping("/{id}")
    public Sale getSale(@PathVariable String id){
        return saleService.getSale(id);
    }
    //obtener ventas de un cliente
    @GetMapping("/customer/{costumerId}")
    public List<Sale> getSalesByCustomer(@PathVariable String costumerId){
        return saleService.getSalesByCustomer(costumerId);
    }

    @PutMapping("/{id}")
    public void updateSale(@RequestBody Sale sale, @PathVariable String id){
    	Sale findSale = saleService.getSale(id);
        if(findSale.getId().equals(id)){
        	sale.setCostumer(findSale.getCostumer());
        	saleService.createSale(sale);
        }
    }

    @DeleteMapping
    public void deleteSale(@PathVariable String id){
    	saleService.deleteSale(id);
    }
    //obtener informes de ventas
    @GetMapping("/month")
    public List<Sale> getSalesByMonth(@RequestParam Date startOfMonth, @RequestParam Date endOfMonth){
        return saleService.getSalesByMonth(startOfMonth, endOfMonth);
    }

    @GetMapping("/week")
    public List<Sale> getSalesByWeek(@RequestParam Date startOfWeek, @RequestParam Date endOfWeek){
        return saleService.getSalesByWeek(startOfWeek, endOfWeek);
    }
    //calcular cuenta
    @GetMapping("/calculate/{saleId}")
    public double calculateTotal(@PathVariable String saleId) {
        return saleService.calculateTotal(saleId);
    }
}
