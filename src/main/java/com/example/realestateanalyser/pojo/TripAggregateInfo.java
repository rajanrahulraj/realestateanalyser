package com.example.realestateanalyser.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class TripAggregateInfo {

	// private int puLocationID;
	// private int doLocationID;
	private BigDecimal tripCount;
	private BigDecimal totalPassengers;
	private Double totalFare;
}
