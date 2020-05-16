package com.enigma.restservice.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Table(name = "item")
@Entity
public class Item extends AbstractEntity {
  @Column(nullable = false)
  private String name;

  public Item() {}

  public Item(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public String toString() {
    return String.format("|%-8s| %-25s|", getId(), name);
  }
}
