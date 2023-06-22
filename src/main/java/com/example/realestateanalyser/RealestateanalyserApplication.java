package com.example.realestateanalyser;

import com.example.realestateanalyser.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

@SpringBootApplication
public class RealestateanalyserApplication {

	public static void main(String[] args) {
		SpringApplication.run(RealestateanalyserApplication.class, args);
	}

	/**
	 * todo: remove test runner
	 */
	@Component
	public class Runner implements CommandLineRunner {
		@Autowired
		TripRepository tripRepository;

		@Override
		public void run(String... args) throws Exception {
			System.out.printf("there are %d trips recorded", tripRepository.count());
		}
	}

}
