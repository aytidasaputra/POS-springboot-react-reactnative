package com.enigma.restservice.services;

import com.enigma.restservice.entities.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService
  extends CommonService<User, String>, UserDetailsService {}
