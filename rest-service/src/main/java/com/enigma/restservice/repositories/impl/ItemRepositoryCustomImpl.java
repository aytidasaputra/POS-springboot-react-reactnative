package com.enigma.restservice.repositories.impl;

import com.enigma.restservice.entities.Item;
import com.enigma.restservice.repositories.ItemRepositoryCustom;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.criteria.*;
import org.springframework.beans.factory.annotation.Autowired;

public class ItemRepositoryCustomImpl implements ItemRepositoryCustom {
  @Autowired
  private EntityManager entityManager;

  @Override
  public List<Item> findByNameLike(String name) {
    CriteriaBuilder builder = entityManager.getCriteriaBuilder();
    CriteriaQuery<Item> query = builder.createQuery(Item.class);
    Root<Item> root = query.from(Item.class);
    query.where(builder.like(root.get("name"), "%" + name + "%"));

    return entityManager.createQuery(query).getResultList();
  }
}
