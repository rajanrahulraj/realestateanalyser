package com.example.realestateanalyser.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Data
@Table(name = "real_estate_zone_prices")
public class RealEstatePriceHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int locationid;
    private BigDecimal price;
    private int year;
}
