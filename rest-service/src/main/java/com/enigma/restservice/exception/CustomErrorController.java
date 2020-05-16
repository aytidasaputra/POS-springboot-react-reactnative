package com.enigma.restservice.exception;

import javax.servlet.http.HttpServletRequest;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import springfox.documentation.annotations.ApiIgnore;

@Controller
@ApiIgnore
public class CustomErrorController implements ErrorController {

  @RequestMapping("/error")
  public void handleError(HttpServletRequest request) {
    Integer statusCode = (Integer) request.getAttribute(
      "javax.srvlet.error.status_code"
    );
    // System.out.println("Status code: " +statusCode );
    if (statusCode == 401) {
      throw new InsufficientAuthenticationException("Unauthorized");
    }
    throw new PathNotFoundException();
  }

  @Override
  public String getErrorPath() {
    return "/error";
  }
}
