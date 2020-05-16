package com.enigma.restservice.exception;

import com.enigma.restservice.models.ResponseMessage;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
  @Autowired
  private MessageSource messageSource;

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(
    MethodArgumentNotValidException e,
    HttpHeaders headers,
    HttpStatus status,
    WebRequest request
  ) {
    Map<String, List<String>> errors = new HashMap<>();

    e
      .getBindingResult()
      .getFieldErrors()
      .forEach(
        fieldError -> {
          String field = fieldError.getField();
          String message = fieldError.getDefaultMessage();
          List<String> messages = errors.get(field);
          if (messages == null) {
            messages = new ArrayList<>();
            errors.put(field, messages);
          }
          messages.add(message);
        }
      );

    String message = messageSource.getMessage(
      "entity.notvalid",
      null,
      LocaleContextHolder.getLocale()
    );

    ResponseMessage body = ResponseMessage.error(
      ErrorCode.ENTITY_NOT_VALID,
      message,
      errors
    );
    System.out.println(123);
    return ResponseEntity.ok(body);
  }

  @ExceptionHandler(ApplicationException.class)
  public ResponseEntity<ResponseMessage> handleApplicationException(
    ApplicationException e
  ) {
    String message = messageSource.getMessage(
      e.getMessage(),
      null,
      LocaleContextHolder.getLocale()
    );
    ResponseMessage body = ResponseMessage.error(e.getCode(), message);
    return ResponseEntity.ok(body);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ResponseMessage> handleUknownException(Exception e) {
    ResponseMessage body = ResponseMessage.error(
      ErrorCode.UNKNOWN,
      e.getMessage()
    );
    return ResponseEntity.ok(body);
  }
}
