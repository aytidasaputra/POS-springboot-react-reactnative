package com.enigma.restservice.security;

import com.enigma.restservice.services.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
  @Autowired
  private UserService userService;

  @Autowired
  private JwtTokenProvider tokenProvider;

  @Override
  protected void doFilterInternal(
    HttpServletRequest request,
    HttpServletResponse response,
    FilterChain filterChain
  )
    throws ServletException, IOException {
    String header = request.getHeader("Authorization");
    String username = null;
    String authToken = null;

    if (header != null && header.startsWith("Bearer")) {
      authToken = header.substring(7);

      try {
        username = tokenProvider.getUsernameFromToken(authToken);
      } catch (IllegalArgumentException e) {
        logger.error("an error occured during getting username from token", e);
      } catch (ExpiredJwtException e) {
        logger.warn("the token is expired and not valid anymore", e);
      } catch (SignatureException e) {
        logger.error("Authentication failed. username or password not valid.");
      }
    } else {
      logger.warn("could'nt find bearer string, will ignore the header");
    }

    if (
      username != null &&
      SecurityContextHolder.getContext().getAuthentication() == null
    ) {
      UserDetails userDetails = userService.loadUserByUsername(username);

      if (tokenProvider.validateToken(authToken, userDetails)) {
        UsernamePasswordAuthenticationToken authentication = tokenProvider.getAuthentication(
          authToken,
          userDetails
        );
        authentication.setDetails(
          new WebAuthenticationDetailsSource().buildDetails(request)
        );
        logger.info(
          "authenticated user " + username + ", setting security context"
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
      }
    }
    filterChain.doFilter(request, response);
  }
}
