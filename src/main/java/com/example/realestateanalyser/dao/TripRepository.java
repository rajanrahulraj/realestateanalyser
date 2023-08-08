package com.example.realestateanalyser.dao;

import com.example.realestateanalyser.pojo.MonthlyTrips;
import org.springframework.data.repository.CrudRepository;

/**
 * trip data-access-object -> uses pre-written methods to query database.
 * need to write custom methods for more complicated queries
 */
public interface TripRepository extends CrudRepository<MonthlyTrips, Long> {
}
