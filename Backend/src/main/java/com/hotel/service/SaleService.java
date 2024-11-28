package com.hotel.service;

import com.hotel.model.Sale;
import com.hotel.model.Room;
import com.hotel.model.Product;
import com.hotel.repository.SaleRepository;
import com.hotel.repository.RoomRepository;
import com.hotel.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;


@Service
public class SaleService {
	private final SaleRepository saleRepository;
	private final RoomRepository roomRepository;
    private final ProductRepository productRepository;
    
    @Autowired
    public SaleService(SaleRepository saleRepository, RoomRepository roomRepository, ProductRepository productRepository) {
        this.saleRepository = saleRepository;
        this.roomRepository = roomRepository;
        this.productRepository = productRepository;
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
    public List<Sale> getSalesByCustomer(String customerId) {
        return saleRepository.findByCostumer(customerId);
    }
    public List<Sale> getSalesByMonth(Date startOfMonth, Date endOfMonth) {
        return saleRepository.findSalesByMonth(startOfMonth, endOfMonth);
    }

    public List<Sale> getSalesByWeek(Date startOfWeek, Date endOfWeek) {
        return saleRepository.findSalesByWeek(startOfWeek, endOfWeek);
    }
 // Método para calcular el total a pagar
    public double calculateTotal(String saleId) {
        Sale sale = saleRepository.findById(saleId).orElseThrow(() -> new RuntimeException("Sale not found"));

        // Calcular estadía
        Room room = roomRepository.findById(sale.getRoom()).orElseThrow(() -> new RuntimeException("Room not found"));
        double totalEstadia = room.getPriceByNight() * 1;  //estadía de 1 día (modificar)

        // Calcular productos consumidos
        List<Product> products = productRepository.findAll(); 
        double totalProductos = 0;
        for (Product product : products) {
            totalProductos += product.getPrice();
        }

        // Calcular total
        double total = totalEstadia + totalProductos;
        return total;
    }
}
