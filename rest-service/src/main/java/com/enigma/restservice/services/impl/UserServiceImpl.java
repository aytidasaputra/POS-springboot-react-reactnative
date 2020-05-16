package com.enigma.restservice.services.impl;

import com.enigma.restservice.entities.User;
import com.enigma.restservice.repositories.UserRepository;
import com.enigma.restservice.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl
  extends CommonServiceImpl<User, String>
  implements UserService {
  @Autowired
  private UserRepository repository;

  @Override
  protected JpaRepository<User, String> getRepository() {
    return repository;
  }

  @Override
  public UserDetails loadUserByUsername(String username)
    throws UsernameNotFoundException {
    return repository
      .findByUsername(username)
      .orElseThrow(
        () ->
          new UsernameNotFoundException(
            "Username not found: '" + username + "'."
          )
      );
  }
}
