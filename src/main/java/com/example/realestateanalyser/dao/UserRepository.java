package com.example.realestateanalyser.dao;

import com.example.realestateanalyser.pojo.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

	// utilizes JPA's method name query creation
	User findByEmail(String email);

	User findByUsername(String username);
}
