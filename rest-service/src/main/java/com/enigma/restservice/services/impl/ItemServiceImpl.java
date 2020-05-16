package com.enigma.restservice.services.impl;

import com.enigma.restservice.entities.Item;
import com.enigma.restservice.repositories.ItemRepository;
import com.enigma.restservice.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class ItemServiceImpl
  extends CommonServiceImpl<Item, Integer>
  implements ItemService {
  @Autowired
  private ItemRepository repository;

  @Override
  protected JpaRepository<Item, Integer> getRepository() {
    return repository;
  }
}
