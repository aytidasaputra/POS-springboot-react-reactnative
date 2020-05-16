package com.enigma.restservice.controllers;

import com.enigma.restservice.models.AuthenticationRequest;
import com.enigma.restservice.models.ResponseMessage;
import com.enigma.restservice.security.JwtTokenProvider;
import com.enigma.restservice.services.UserService;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  JwtTokenProvider jwtTokenProvider;

  @Autowired
  UserService userService;

  @PostMapping("/signin")
  public ResponseMessage signIn(@RequestBody AuthenticationRequest data) {
    try {
      String username = data.getUsername();
      Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(username, data.getPassword())
      );
      String token = jwtTokenProvider.generateToken(authentication);

      Map<Object, Object> model = new HashMap<>();
      model.put("username", username);
      model.put("token", token);

      return ResponseMessage.success(model);
    } catch (AuthenticationException e) {
      throw new BadCredentialsException("Invalid username/password supplied");
    }
  }
}
