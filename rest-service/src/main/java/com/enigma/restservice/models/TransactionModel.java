package com.enigma.restservice.models;

import com.enigma.restservice.entities.converter_enum.TypeEnum;
import com.enigma.restservice.validation.annotations.MinLength;
import java.math.BigDecimal;
import javax.validation.constraints.*;

public class TransactionModel {
  private Integer id;

  private BigDecimal amount;

  private TypeEnum type;

  @MinLength(value = 1, message = "not blank please")
  @NotBlank(message = "not blank.")
  private String description;

  public TransactionModel() {}

  public TransactionModel(
    Integer id,
    BigDecimal amount,
    TypeEnum type,
    String description
  ) {
    this.id = id;
    this.amount = amount;
    this.type = type;
    this.description = description;
  }

  public Integer getId() {
    return this.id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public BigDecimal getAmount() {
    return this.amount;
  }

  public void setAmount(BigDecimal amount) {
    this.amount = amount;
  }

  public TypeEnum getType() {
    return this.type;
  }

  public void setType(TypeEnum type) {
    this.type = type;
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
      ", amount='" +
      getAmount() +
      "'" +
      ", type='" +
      getType() +
      "'" +
      ", description='" +
      getDescription() +
      "'" +
      "}"
    );
  }
}
