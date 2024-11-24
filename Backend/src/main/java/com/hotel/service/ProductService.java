package com.hotel.service;

import com.hotel.model.Product;
import com.hotel.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
	private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product getProduct(String id) {
        return productRepository.findById(id).orElse(null);
    }

    public void deleteProduct(String id) {
    	productRepository.deleteById(id);
    }
}
