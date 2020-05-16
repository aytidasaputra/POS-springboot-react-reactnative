package com.enigma.restservice.models;

import com.enigma.restservice.entities.Item;
import com.enigma.restservice.entities.Stock;
import com.enigma.restservice.entities.Unit;
import com.enigma.restservice.validation.annotations.MinLength;
import java.util.Collection;
import java.util.Map;
import javax.validation.constraints.NotBlank;

public class StockModel {

  Map<Stock, Map<Integer, Integer>> sumStocks(Collection<Stock> stocks) {
    return sumStocks(stocks);
  }

  protected Integer id;

  protected Integer quantity;

  protected Item item;
  protected Unit unit;

  public StockModel() {}

  public StockModel(Integer id, Integer quantity, Item item, Unit unit) {
    this.id = id;
    this.quantity = quantity;
    this.item = item;
    this.unit = unit;
  }

  public Integer getId() {
    return this.id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getQuantity() {
    return this.quantity;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }

  public Item getItem() {
    return this.item;
  }

  public void setItem(Item item) {
    this.item = item;
  }

  public Unit getUnit() {
    return this.unit;
  }

  public void setUnit(Unit unit) {
    this.unit = unit;
  }

  @Override
  public String toString() {
    return (
      "{" +
      " id='" +
      getId() +
      "'" +
      ", quantity='" +
      getQuantity() +
      "'" +
      ", item='" +
      getItem() +
      "'" +
      ", unit='" +
      getUnit() +
      "'" +
      "}"
    );
  }
}
