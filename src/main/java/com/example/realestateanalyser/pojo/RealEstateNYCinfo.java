package com.example.realestateanalyser.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
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

	public RealEstateNYCinfo(String address, String bble, String stories, String fulval, int year, String latitude, String longitude){
		this.address = address;
		this.bble = bble;
		this.stories = stories;
		this.fulval = fulval;
		this.year = year;
		this.latitude = latitude;
		this.longitude = longitude;
	}

	public RealEstateNYCinfo(String address, String bble, String stories, String fulval, int year){
		this.address = address;
		this.bble = bble;
		this.stories = stories;
		this.fulval = fulval;
		this.year = year;
	}

}
