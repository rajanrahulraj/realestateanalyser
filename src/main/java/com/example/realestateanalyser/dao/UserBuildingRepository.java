package com.example.realestateanalyser.dao;

import com.example.realestateanalyser.pojo.UserBuildingLink;
import org.springframework.data.repository.CrudRepository;

public interface UserBuildingRepository extends CrudRepository<UserBuildingLink, Long> {
	UserBuildingLink findByUserIDAndBuildingBble(long userID, String buildingBble);
}
