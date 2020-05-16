package com.enigma.restservice.entities;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Table(name = "stock")
@Entity
public class Stock extends AbstractEntity {
  private Integer quantity;

  @ManyToOne
  @JoinColumn(name = "item_id")
  private Item item;

  @ManyToOne
  @JoinColumn(name = "unit_id")
  private Unit unit;

  public Stock(Integer quantity, Item item, Unit unit) {
    this.quantity = quantity;
    this.item = item;
    this.unit = unit;
  }

  public Stock() {}

  public Integer getQuantity() {
    return quantity;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }

  public Item getItem() {
    return item;
  }

  public void setItem(Item item) {
    this.item = item;
  }

  public Unit getUnit() {
    return unit;
  }

  public void setUnit(Unit unit) {
    this.unit = unit;
  }

  @Override
  public String toString() {
    return (
      "{" +
      " quantity='" +
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
