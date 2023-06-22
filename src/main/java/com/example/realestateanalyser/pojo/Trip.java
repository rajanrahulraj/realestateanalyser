package com.example.realestateanalyser.pojo;

import jakarta.persistence.*;
import lombok.Data;


/**
 * The pojo that encapsulates each row of the trip table
 */

@Data
@Entity
public class Trip {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "vendorid")
	private int vendorId;
}
