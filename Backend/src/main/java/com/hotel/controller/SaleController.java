package com.hotel.controller;

import com.hotel.model.Sale;
import com.hotel.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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

    @PutMapping("/{id}")
    public void updateSale(@RequestBody Sale sale, @PathVariable String id){
    	Sale findSale = saleService.getSale(id);
    	Sale saleAux;
        if(findSale.getId() == id){
        	sale.setName(findSale.getName());
        	saleAux = saleService.createSale(sale);
        }
    }

    @DeleteMapping
    public void deleteSale(@PathVariable String id){
    	saleService.deleteSale(id);
    }
}
