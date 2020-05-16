package com.enigma.restservice.configs;

import com.enigma.restservice.security.JwtAuthenticationEntityPoint;
import com.enigma.restservice.security.JwtAuthenticationFilter;
import com.enigma.restservice.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
  @Autowired
  private UserService userService;

  @Autowired
  private JwtAuthenticationFilter filter;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Bean
  public PasswordEncoder passwordEncoder() {
    if (passwordEncoder == null) {
      passwordEncoder =
        PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
    return passwordEncoder;
  }

  @Bean
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userService).passwordEncoder(passwordEncoder());
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
      .httpBasic()
      .and()
      .csrf()
      .disable()
      .sessionManagement()
      .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()
      // .authorizeRequests()
      // .antMatchers("/auth/signin")
      // .permitAll()
      // .antMatchers("/items/**")
      // .hasAuthority("ADMIN")
      // .anyRequest()
      // .authenticated()
      // .and()
      .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
    // .exceptionHandling()
    // .authenticationEntryPoint(new JwtAuthenticationEntityPoint());
  }
}
