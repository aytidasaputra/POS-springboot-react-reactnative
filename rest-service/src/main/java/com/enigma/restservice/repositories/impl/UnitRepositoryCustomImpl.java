package com.enigma.restservice.repositories.impl;

import com.enigma.restservice.entities.Unit;
import com.enigma.restservice.repositories.UnitRepositoryCustom;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.criteria.*;
import org.springframework.beans.factory.annotation.Autowired;

public class UnitRepositoryCustomImpl implements UnitRepositoryCustom {
  @Autowired
  private EntityManager entityManager;

  @Override
  public List<Unit> findByNameLike(String name, String description) {
    CriteriaBuilder builder = entityManager.getCriteriaBuilder();
    CriteriaQuery<Unit> query = builder.createQuery(Unit.class);
    Root<Unit> root = query.from(Unit.class);
    query.where(
      builder.like(
        root.get("name").get("description"),
        "%" + name + description + "%"
      )
    );

    return entityManager.createQuery(query).getResultList();
  }
}
