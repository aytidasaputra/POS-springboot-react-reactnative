package com.enigma.restservice.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Table(name = "unit")
@Entity
public class Unit extends AbstractEntity {
  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private String description;

  public Unit() {}

  public Unit(String name, String description) {
    this.name = name;
    this.description = description;
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
      " name='" +
      getName() +
      "'" +
      ", description='" +
      getDescription() +
      "'" +
      "}"
    );
  }
}
