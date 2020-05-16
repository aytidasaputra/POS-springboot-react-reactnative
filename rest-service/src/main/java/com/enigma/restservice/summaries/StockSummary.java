package com.enigma.restservice.summaries;

public class StockSummary {
  private String name;
  private Long quantity;

  public StockSummary(String name, Long quantity) {
    this.name = name;
    this.quantity = quantity;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Long getQuantity() {
    return quantity;
  }

  public void setQuantity(Long quantity) {
    this.quantity = quantity;
  }
}
