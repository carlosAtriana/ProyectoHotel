package com.hotel.controller;

import com.hotel.model.Product;
import com.hotel.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class ProductController {
	private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getProducts(){
        return productService.getProducts();
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product){
        return productService.createProduct(product);
    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable String id){
        return productService.getProduct(id);
    }

    @PutMapping("/{id}")
    public void updateProduct(@RequestBody Product product, @PathVariable String id){
    	Product findProduct = productService.getProduct(id);
    	Product productAux;
        if(findProduct.getId() == id){
        	product.setName(findProduct.getName());
        	productAux = productService.createProduct(product);
        }
    }

    @DeleteMapping
    public void deleteProduct(@PathVariable String id){
    	productService.deleteProduct(id);
    }
}
