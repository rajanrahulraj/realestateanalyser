package com.example.realestateanalyser.dao;

import com.example.realestateanalyser.pojo.RealEstatePriceHistory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RealEstateRepository extends CrudRepository<RealEstatePriceHistory, Integer> {
    List<RealEstatePriceHistory> findAll();
    List<RealEstatePriceHistory> findByLocationid(int locationid);

}
