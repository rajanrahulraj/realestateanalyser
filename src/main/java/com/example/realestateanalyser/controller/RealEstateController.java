package com.example.realestateanalyser.controller;

import com.example.realestateanalyser.dao.RealEstateRepository;
import com.example.realestateanalyser.pojo.RealEstatePriceHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/realestate")
public class RealEstateController {

    @Autowired
    RealEstateRepository realEstateRepository;
    @GetMapping("/priceHistory")
    public List<RealEstatePriceHistory> priceHistory() {
        return realEstateRepository.findAll();
    }

    @GetMapping("/priceByLocation")
    public List<RealEstatePriceHistory> getPriceByLocation(int locationid) {
        return realEstateRepository.findByLocationid(locationid);
    }
}
