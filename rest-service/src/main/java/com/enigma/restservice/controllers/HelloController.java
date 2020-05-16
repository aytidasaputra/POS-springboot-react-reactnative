package com.enigma.restservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@ApiIgnore
@RequestMapping("/hello")
@RestController
public class HelloController {
  @Autowired
  private MessageSource messageSource;

  @GetMapping
  public String sayHelloString() {
    String message = messageSource.getMessage(
      "Hello",
      new String[] { "didit" },
      LocaleContextHolder.getLocale()
    );
    return message;
  }
}
