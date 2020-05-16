package com.enigma.restservice.entities;

import com.enigma.restservice.entities.converter_enum.TypeConverter;
import com.enigma.restservice.entities.converter_enum.TypeEnum;
import java.math.BigDecimal;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Table;

@Table(name = "transaction")
@Entity
public class Transaction extends AbstractEntity {
  @Column(nullable = false)
  private BigDecimal amount;

  @Column(nullable = false)
  @Convert(converter = TypeConverter.class)
  private TypeEnum type;

  @Column(nullable = false)
  private String description;

  public Transaction() {}

  public Transaction(BigDecimal amount, TypeEnum type, String description) {
    this.amount = amount;
    this.type = type;
    this.description = description;
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
      " amount='" +
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
