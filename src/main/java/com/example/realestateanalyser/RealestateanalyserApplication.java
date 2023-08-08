package com.example.realestateanalyser;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RealestateanalyserApplication {

	public static void main(String[] args) {
		SpringApplication.run(RealestateanalyserApplication.class, args);
	}

	/**
	 * todo: remove test runner
	 */
	// @Component
	// public class Runner implements CommandLineRunner {
	// 	@Autowired
	// 	TripRepository tripRepository;
	//
	// 	@Override
	// 	public void run(String... args) throws Exception {
	// 		System.out.printf("there are %d trips recorded", tripRepository.count());
	// 	}
	// }
}
