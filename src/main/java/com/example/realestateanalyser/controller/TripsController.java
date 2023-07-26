package com.example.realestateanalyser.controller;

import com.example.realestateanalyser.dao.TripDao;
import com.example.realestateanalyser.pojo.TripAggregateInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/trip")
public class TripsController {
	@Autowired
	TripDao tripDao;

	@GetMapping("/pickup")
	public TripAggregateInfo pickupAggregateInfo(
			int pickupLocationID,
			int year) {
		return tripDao.yearlyPickup(pickupLocationID, year);
	}

	@GetMapping("/dropoff")
	public TripAggregateInfo dropoffAggregateInfo(int dropoffLocationID, int year) {
		return tripDao.yearlyDropoff(dropoffLocationID, year);
	}

	// @GetMapping("/pickup")
	// public TripAggregateInfo pickupAggregateInfo(
	// 		int pickupLocationID,
	// 		@DateTimeFormat(pattern = "yyyy-MM-dd") Date startMonth,
	// 		@DateTimeFormat(pattern = "yyyy-MM-dd") Date endMonth) {
	// 	return tripDao.monthlyPickup(pickupLocationID, startMonth, endMonth);
	// }
	//
	// @GetMapping("/dropoff")
	// public TripAggregateInfo dropoffAggregateInfo(
	// 		int dropoffLocationID,
	// 		@DateTimeFormat(pattern = "yyyy-MM-dd") Date startMonth,
	// 		@DateTimeFormat(pattern = "yyyy-MM-dd") Date endMonth) {
	// 	return tripDao.monthlyDropoff(dropoffLocationID, startMonth, endMonth);
	// }
}
