package com.hotel.service;

import com.hotel.model.Sale;
import com.hotel.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaleService {
	private final SaleRepository saleRepository;

    @Autowired
    public SaleService(SaleRepository saleRepository) {
        this.saleRepository = saleRepository;
    }

    public List<Sale> getSales() {
        return saleRepository.findAll();
    }

    public Sale createSale(Sale sale) {
        return saleRepository.save(sale);
    }

    public Sale getSale(String id) {
        return saleRepository.findById(id).orElse(null);
    }

    public void deleteSale(String id) {
    	saleRepository.deleteById(id);
    }
}
