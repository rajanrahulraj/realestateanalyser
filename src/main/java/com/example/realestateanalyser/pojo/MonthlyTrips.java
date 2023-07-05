package com.example.realestateanalyser.pojo;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Type;


/**
 * The pojo that encapsulates each row of the monthly_trips table
 */

@Data
@Entity
@Table(name = "monthly_trips")
public class MonthlyTrips {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "pulocationid")
	private int puLocationId;

	private int year;
	private int month;

	@Column(name = "trip_count")
	private long tripCount;
}
