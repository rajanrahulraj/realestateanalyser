package com.example.realestateanalyser.controller;

import com.example.realestateanalyser.dao.UserRepository;
import com.example.realestateanalyser.general.CustomResponse;
import com.example.realestateanalyser.pojo.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpRequest;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	UserRepository userRepository;

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
}
