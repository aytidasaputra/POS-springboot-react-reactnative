package com.enigma.restservice.models;

import com.enigma.restservice.validation.annotations.MinLength;
import javax.validation.constraints.*;

public class UnitModel {
  private Integer id;

  @MinLength(value = 1, message = "Name not blank please--")
  @NotBlank(message = "Name not blank please")
  // @Email(message = "--email.notblank--")
  private String name;

  @MinLength(value = 1, message = "Desc not blank please")
  @NotBlank(message = "desc not blank.")
  private String description;

  public UnitModel(Integer id, String name, String description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  public UnitModel() {}

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  @Override
  public String toString() {
    return (
      "{" +
      " id='" +
      getId() +
      "'" +
      ", name='" +
      getName() +
      "'" +
      ", description='" +
      getDescription() +
      "'" +
      "}"
    );
  }
}
