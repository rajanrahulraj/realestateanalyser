package com.example.realestateanalyser.repository;

import com.example.realestateanalyser.pojo.Trip;
import org.springframework.data.repository.CrudRepository;

/**
 * trip data-access-object -> uses pre-written methods to query database.
 * need to write custom methods for more complicated queries
 */
public interface TripRepository extends CrudRepository<Trip, Long> {
}
