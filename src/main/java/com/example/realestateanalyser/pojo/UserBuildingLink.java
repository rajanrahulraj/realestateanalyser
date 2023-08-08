package com.example.realestateanalyser.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "user_building_link")
@NoArgsConstructor
public class UserBuildingLink {
	// switch to the native composite primary key in database?
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private long userID;
	@Column(name = "building_bble")
	private String buildingBble;

	public UserBuildingLink(long userID, String buildingBble) {
		this.userID = userID;
		this.buildingBble = buildingBble;
	}
}
