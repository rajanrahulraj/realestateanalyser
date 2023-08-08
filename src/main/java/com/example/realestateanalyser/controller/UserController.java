package com.example.realestateanalyser.controller;

import com.example.realestateanalyser.dao.RealEstateDao;
import com.example.realestateanalyser.dao.UserBuildingRepository;
import com.example.realestateanalyser.dao.UserRepository;
import com.example.realestateanalyser.general.CustomResponse;
import com.example.realestateanalyser.pojo.RealEstateNYCinfo;
import com.example.realestateanalyser.pojo.User;
import com.example.realestateanalyser.pojo.UserBuildingLink;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpRequest;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	UserRepository userRepository;
	@Autowired
	UserBuildingRepository userBuildingRepository;
	@Autowired
	RealEstateDao realEstateDao;

	@PostMapping("/signup")
	public CustomResponse signUp(@RequestBody User user) {
		User exisitingEmail = userRepository.findByEmail(user.getEmail());
		if (null != exisitingEmail) return CustomResponse.error("email is already registered");
		User exisitingUsername = userRepository.findByUsername(user.getUsername());
		if (null != exisitingUsername) return CustomResponse.error("username already exists");

		// save new user
		String enteredPassword = user.getPassword();
		String encryptedPassword = DigestUtils.md5DigestAsHex(enteredPassword.getBytes());
		user.setPassword(encryptedPassword);
		userRepository.save(user);
		return CustomResponse.success("successfully registered");
	}

	// use post for sign-in to hide sensitive login information
	@PostMapping("/signin")
	public CustomResponse siginIn(HttpServletRequest request, @RequestBody User user) {
		String password = user.getPassword();
		String encryptedPassword = DigestUtils.md5DigestAsHex(password.getBytes());
		User recordedUser = userRepository.findByUsername(user.getUsername());

		if (null == recordedUser) return CustomResponse.error("username doesn't exist");
		if (!recordedUser.getPassword().equals(encryptedPassword))
			return CustomResponse.error("password doesn't match username");

		request.getSession().setAttribute("user", recordedUser.getId());
		return CustomResponse.success(recordedUser.getUsername() + "is logged in");
	}

	@PostMapping("/markUnmarkFavorite")
	public CustomResponse markUnmarkFavorite(HttpServletRequest request, @RequestParam String buildingBble) {
		final HttpSession session = request.getSession();
		final Object user = session.getAttribute("user");
		if (null == user) {
			return CustomResponse.error("no user logged in");
		}
		long userID = (Long) user;
		// int userID = -1;
		// for (Cookie cookie : cookies) {
		// 	if (cookie.getName().equals("user")) {
		// 		userID = Integer.valueOf(cookie.getValue());
		// 		break;
		// 	}
		// }

		// if (userID == -1) return CustomResponse.error("no user logged in");
		UserBuildingLink existingEntry = userBuildingRepository.findByUserIDAndBuildingBble(userID, buildingBble);
		if (null == existingEntry) {
			userBuildingRepository.save(new UserBuildingLink(userID, buildingBble));
			return CustomResponse.success("saved building to user's favorites");
		} else {
			userBuildingRepository.delete(existingEntry);
			return CustomResponse.success("removed building from user's favorites");
		}
	}

	@GetMapping("/loggedInUserFavorites")
	public List<RealEstateNYCinfo> userFavoritesFromSession(HttpServletRequest request) {
		final HttpSession session = request.getSession();
		final Object user = session.getAttribute("user");
		if (null == user) {
			return null;
		}
		long userID = (Long) user;
		final List<RealEstateNYCinfo> realEstateNYCinfos = realEstateDao.usersFavoriteBuildings(userID);
		return realEstateNYCinfos;
	}

	@GetMapping("/userFavorites")
	public List<RealEstateNYCinfo> userFavorites(@RequestParam int userID) {
		final List<RealEstateNYCinfo> realEstateNYCinfos = realEstateDao.usersFavoriteBuildings(userID);
		return realEstateNYCinfos;
	}
}
