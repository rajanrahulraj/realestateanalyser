package com.example.realestateanalyser.controller;

import com.example.realestateanalyser.dao.TripDao;
import com.example.realestateanalyser.pojo.TripAggregateInfo;
import com.example.realestateanalyser.util.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
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
			@DateTimeFormat(pattern = "yyyy-MM-dd") Date startMonth,
			@DateTimeFormat(pattern = "yyyy-MM-dd") Date endMonth) {
		return tripDao.pickupAggregates(pickupLocationID, startMonth, endMonth);
	}

	@GetMapping("/dropoff")
	public TripAggregateInfo dropoffAggregateInfo(
			int dropoffLocationID,
			@DateTimeFormat(pattern = "yyyy-MM-dd") Date startMonth,
			@DateTimeFormat(pattern = "yyyy-MM-dd") Date endMonth) {
		return tripDao.dropoffAggregates(dropoffLocationID, startMonth, endMonth);
	}
}
