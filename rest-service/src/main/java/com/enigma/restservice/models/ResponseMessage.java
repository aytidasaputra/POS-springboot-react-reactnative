package com.enigma.restservice.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;

public class ResponseMessage<T> {
  private int code;
  private String message;
  private T data;

  @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss.SSS")
  private LocalDateTime timestamp;

  private ResponseMessage(int code, String message, T data) {
    this.code = code;
    this.message = message;
    this.data = data;
    this.timestamp = LocalDateTime.now();
  }

  public LocalDateTime getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(LocalDateTime timestamp) {
    this.timestamp = timestamp;
  }

  public int getCode() {
    return code;
  }

  public void setCode(int code) {
    this.code = code;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public T getData() {
    return data;
  }

  public void setData(T data) {
    this.data = data;
  }

  public static <T> ResponseMessage<T> success(T data) {
    return new ResponseMessage<>(0, "success", data);
  }

  public static <T> ResponseMessage<T> error(int code, String message) {
    return new ResponseMessage<>(code, message, null);
  }

  public static <T> ResponseMessage<T> error(int code, String message, T data) {
    return new ResponseMessage<>(code, message, data);
  }
}
