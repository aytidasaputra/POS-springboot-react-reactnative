package com.enigma.restservice.security;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.web.AuthenticationEntryPoint;

public class JwtAuthenticationEntityPoint implements AuthenticationEntryPoint {

  @Override
  public void commence(
    HttpServletRequest request,
    HttpServletResponse response,
    org.springframework.security.core.AuthenticationException e
  )
    throws IOException, ServletException {
    response.sendError(
      HttpServletResponse.SC_UNAUTHORIZED,
      "Jwt authentication failed"
    );
  }
}
