package com.example.realestateanalyser.general;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CustomResponse {
	/**
	 1 for success; any other number means error
	 **/
	private Integer responseCode;

	private String message;

	public static CustomResponse success(String message) {
		return new CustomResponse(1, message);
	}

	public static CustomResponse error(String message) {
		return new CustomResponse(0, message);
	}

}
