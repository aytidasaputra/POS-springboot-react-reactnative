package com.enigma.restservice.exception;

public final class ErrorCode {

  private ErrorCode() {}

  public static final int UNKNOWN = -1;
  public static final int ENTITY_NOT_FOUND = 1;
  public static final int ENTITY_NOT_VALID = 2;
  public static final int PATH_NOT_FOUND = 3;
}
