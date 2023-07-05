package com.example.realestateanalyser.controller;

import com.example.realestateanalyser.pojo.TripAggregateInfo;
import com.example.realestateanalyser.util.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController("/trip")
public class TripsController {
	private final SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

	@GetMapping
	public void pickupAggregateInfo(
			int pickupLocationID,
			@DateTimeFormat(pattern = "yyyy-MM") Date startMonth,
			@DateTimeFormat(pattern = "yyyy-MM") Date endMonth) {
		Session session = sessionFactory.getCurrentSession();
	}
}
