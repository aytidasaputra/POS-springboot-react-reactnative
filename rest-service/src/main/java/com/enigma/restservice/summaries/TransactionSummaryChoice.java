package com.enigma.restservice.summaries;

import com.enigma.restservice.entities.converter_enum.TypeEnum;
import java.math.BigDecimal;

public class TransactionSummaryChoice {
  private BigDecimal amount;
  private TypeEnum type;

  public TransactionSummaryChoice() {}

  public TransactionSummaryChoice(TypeEnum type, BigDecimal amount) {
    this.amount = amount;
    this.type = type;
  }

  public BigDecimal getAmount() {
    return amount;
  }

  public void setAmount(BigDecimal amount) {
    this.amount = amount;
  }

  public TypeEnum getType() {
    return type;
  }

  public void setType(TypeEnum type) {
    this.type = type;
  }
}
