package com.example.realestateanalyser.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RealEstateNYCinfo {

	private String address;
	private String bble;
	private String stories;
	private String fulval;
	// private int locationid;
	// private String avland;
	// private String avtot;
	// private String exland;
	// private String extot;
	private int year;

	private String latitude;
	private String longitude;


}
